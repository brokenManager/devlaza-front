import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as styles from "css/App.module.css";
import Header from "./comp/Header";
import Footer from "./comp/Footer";

import { MuiThemeProvider } from "@material-ui/core/styles";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import * as Pages from "./comp/pages";
import { theme } from "./theme";

library.add(fas, far);

// ログインしているユーザーの情報
type AppStatus = {
  loginUserFollowingIdList: number[];
};

type AppProps = {};

class App extends React.Component<AppProps, AppStatus> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      loginUserFollowingIdList: [10, 220],
    };
  }

  updateFollowingList = (followingIndex: number, userId: number) => {
    const list = this.state.loginUserFollowingIdList;
    if (followingIndex === -1) {
      list.push(userId);
    } else {
      list.splice(followingIndex, 1);
    }
    this.setState({ loginUserFollowingIdList: list });
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className={styles.App}>
          <Header />
          <div className={styles.app_content_wrapper}>
            <Router>
              <Route exact path="/" component={Pages.MainPage} />
              <Route
                exact
                path="/projects/create"
                component={Pages.CreateProjectPage}
              />
              <Route
                path="/user/detail"
                render={() => (
                  <Pages.UserDetailsPage
                    loginUserFollowingIdList={
                      this.state.loginUserFollowingIdList
                    }
                    updateFollowingList={this.updateFollowingList}
                  />
                )}
              />
              <Route
                path="/projects/detail/:uuid"
                component={Pages.ProjectDetailPage}
              />
            </Router>
          </div>
          <div className={styles.footerPosition}>
            <Footer />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
