import React, { Component } from "react";
import Modal from "./Modal/Modal";
import axios from "axios";
import { BASE_URL } from '../api/axio';
import { userRefresh } from "../../global-state/actions/tokenAction";
import { logOut } from "../../global-state/actions/authActions";

import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Cookies from "js-cookie";

const axiosApiInstance = axios.create();

const ErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            accessToken: this.props.accessToken,
            error: null,
            show: false,
        };

        onLogout = (e) => {
            this.props.LogOut();
        };

        UNSAFE_componentWillMount() {
            
            const access =Cookies.get("accessToken");

            if (!access) {
                this.props.logOut();
                window.location.pathname = "/1";
                return;
            }
            this.reqInterceptor = axios.interceptors.request.use(
                async (config) => {
                    config.headers.Authorization = "Bearer " + access;
                    this.setState({ error: null });

                    return config;
                }
            );
            this.resInterceptor = axios.interceptors.response.use(
                (response) => {
                    return response;
                },
                async (error) => {
                    const originalRequest = error.config;
                    if (error.response && error.response.status === 401) {
                        console.log(originalRequest._retry);
                        originalRequest._retry = true;

                        console.log(error.response);
                        if (
                            error.response.config?.url.includes(
                                "/auth/jwt/refresh"
                            )
                        ) {
                            this.props.logOut();
                            window.location.pathname = "/2";
                        } else {
                            let x = await axios
                                .post(BASE_URL + `/auth/jwt/refresh`, {
                                    refresh:
                                        localStorage.getItem("refreshToken"),
                                })
                                .catch((err) => {
                                    console.log("here");
                                    console.log(err.response);
                                    if (
                                        err.response &&
                                        err.response.status === 401
                                    ) {
                                        console.log("here");
                                        this.props.LogOut();
                                        window.location.pathname = "/3";
                                    }
                                });

                            if (x) {
                                Cookies.set("accessToken", x.data.access);
                                console.log(x);
                            }
                        }

                        return axiosApiInstance(originalRequest);
                    } else if (error.response) {
                        if (
                            error.response.status === 400 &&
                            error.response.status
                        ) {
                            this.setState({ error: "", show: false });
                        }
                    } else {
                        console.log(error);
                        this.setState({ error: error, show: true });
                        console.log(this.state);
                    }
                    return Promise.reject(error);
                }
            );
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmed = () => {
            this.setState({ error: null, show: false });
        };

        render() {
            return (
                <div>
                    <Modal show={this.state.show} clicked={this.errorConfirmed}>
                        {this.state.show ? this.state.error?.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}></WrappedComponent>
                </div>
            );
        }
    };
};

const mapStateToProps = (state) => ({
    accessToken: state.accessToken,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ userRefresh, logOut }, dispatch);
};

const composedComponent = compose(
    connect(mapStateToProps, mapDispatchToProps),
    ErrorHandler
);
export default composedComponent;
