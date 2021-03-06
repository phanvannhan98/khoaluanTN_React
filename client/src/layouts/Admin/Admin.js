import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

import logo from "assets/img/react-logo.png";

import "assets/scss/black-dashboard-react.scss";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { StylesProvider } from "@material-ui/styles";
import { MuiThemeProvider } from "@material-ui/core";
import themeAdmin from "utils/themeAdmin";

var ps;

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: "blue",
            sidebarOpened:
                document.documentElement.className.indexOf("nav-open") !== -1,
        };
    }
    componentDidMount() {
        this.props.getData();
        if (navigator.platform.indexOf("Win") > -1) {
            document.documentElement.className += " perfect-scrollbar-on";
            document.documentElement.classList.remove("perfect-scrollbar-off");
            ps = new PerfectScrollbar(this.refs.mainPanel, {
                suppressScrollX: true,
            });
            let tables = document.querySelectorAll(".table-responsive");
            for (let i = 0; i < tables.length; i++) {
                ps = new PerfectScrollbar(tables[i]);
            }
        }
    }
    componentWillUnmount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
            document.documentElement.className += " perfect-scrollbar-off";
            document.documentElement.classList.remove("perfect-scrollbar-on");
        }
    }
    componentDidUpdate(e) {
        if (e.history.action === "PUSH") {
            if (navigator.platform.indexOf("Win") > -1) {
                let tables = document.querySelectorAll(".table-responsive");
                for (let i = 0; i < tables.length; i++) {
                    ps = new PerfectScrollbar(tables[i]);
                }
            }
            document.documentElement.scrollTop = 0;
            document.scrollingElement.scrollTop = 0;
            this.refs.mainPanel.scrollTop = 0;
        }
    }
    // this function opens and closes the sidebar on small devices
    toggleSidebar = () => {
        document.documentElement.classList.toggle("nav-open");
        this.setState({ sidebarOpened: !this.state.sidebarOpened });
    };
    getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/admin") {
                return (
                    <Route
                        exact={prop.exact}
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };
    handleBgClick = (color) => {
        this.setState({ backgroundColor: color });
    };
    getBrandText = (path) => {
        for (let i = 0; i < routes.length; i++) {
            let pathname = routes[i].layout + routes[i].path;
            let isHaveParams = pathname.indexOf(":");
            pathname =
                isHaveParams !== -1
                    ? pathname.substring(0, isHaveParams - 1)
                    : pathname;
            if (this.props.location.pathname.indexOf(pathname) !== -1) {
                return routes[i].name;
            }
        }
        return "Brand";
    };
    render() {
        return (
            <>
                <MuiThemeProvider theme={themeAdmin}>
                    <StylesProvider>
                        <div className="wrapper">
                            <Sidebar
                                {...this.props}
                                routes={routes}
                                bgColor={this.state.backgroundColor}
                                logo={{
                                    outterLink: "https://www.creative-tim.com/",
                                    text: "Admin Manager",
                                    imgSrc: logo,
                                }}
                                toggleSidebar={this.toggleSidebar}
                            />
                            <div
                                className="main-panel"
                                ref="mainPanel"
                                data={this.state.backgroundColor}
                            >
                                <AdminNavbar
                                    {...this.props}
                                    brandText={this.getBrandText(
                                        this.props.location.pathname
                                    )}
                                    toggleSidebar={this.toggleSidebar}
                                    sidebarOpened={this.state.sidebarOpened}
                                />
                                <Switch>
                                    {this.getRoutes(routes)}
                                    <Redirect from="*" to="/admin/dashboard" />
                                </Switch>
                                {
                                    // we don't want the Footer to be rendered on map page
                                    this.props.location.pathname.indexOf(
                                        "maps"
                                    ) !== -1 ? null : (
                                        <Footer fluid />
                                    )
                                }
                            </div>
                        </div>
                        <FixedPlugin
                            bgColor={this.state.backgroundColor}
                            handleBgClick={this.handleBgClick}
                        />
                    </StylesProvider>
                </MuiThemeProvider>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getData: () => {
            dispatch(actions.actGetAllTeacherRequest());
            dispatch(actions.actGetAllSubSubjectRequest());
            dispatch(actions.actGetAllSubjectRequest());
            dispatch(actions.actGetAllClassroomRequest());
            dispatch(actions.actGetAllStudentStudyingRequest());
        },
    };
};
export default connect(null, mapDispatchToProps)(Admin);
