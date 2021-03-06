import * as React from "react";
import * as styles from "css/comp/pages/ProjectDetailPage.module.css";
import * as CommonStyle from "css/comp/Common.module.css";

import { RouteComponentProps } from "react-router-dom";

import { Button, Link, Divider } from "@material-ui/core";

import { PostAdd, Favorite } from "@material-ui/icons";
import Loading from "../Loading";
import Avater from "../Avater";
import ListElementTag from "comp/ListElementTag";
import { Tag } from "../../lib/model/Tag";
import ShareButtons from "../ShareButtons";

/* --- ボタンのスタイル --- */

type ProjectDetailPageProps = RouteComponentProps<{ uuid: string }>;

type ProjectDetailPageState = {
  name: string;
  createdAt: string;
  createdUser: string;
  recruiting: boolean;
  introduction: string;
  sites: string[][];
  tags: Tag[];
  member: string[];
  favs: number;
  isLoaded: boolean;
};

const favIconStyle = {
  marginLeft: "1em",
  fontSize: "90%",
  verticalAlign: "middle",
};

class ProjectDetailPage extends React.Component<
  ProjectDetailPageProps,
  ProjectDetailPageState
> {
  constructor(props: ProjectDetailPageProps) {
    super(props);
    this.state = {
      name: "",
      createdAt: "",
      createdUser: "",
      recruiting: true,
      introduction: "",
      sites: [[]],
      tags: [],
      member: [],
      favs: 0,
      isLoaded: false,
    };
  }

  componentDidMount() {
    // TODO: ここでAPIをぶっ叩く
    this.setState({
      name: this.props.match.params.uuid + "というUUIDを持つプロジェクト",
      createdAt: "2020/04/02",
      createdUser: "ichiyo",
      introduction:
        "バックのつよつよムーブが完了するとここがプロジェクトに基づいたものになります",
      sites: [
        ["GitHub", "https://github.com/"],
        ["Twitter", "https://twitter.com/"],
      ],
      tags: [
        { name: "タグ-1", uuid: "1" },
        { name: "タグ-2", uuid: "2" },
        { name: "タグ-3", uuid: "3" },
        { name: "タグ-4", uuid: "4" },
        { name: "タグ-5", uuid: "5" },
      ],
      member: ["haracho", "meme", "birb"],
      favs: 100,
      recruiting: true,
      isLoaded: true,
    });

    this.setState({
      name: "【React】Webサービス フロントエンド",
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return <Loading />;
    }

    let joinButton = (
      <Button variant="contained" size="large" disabled startIcon={<PostAdd />}>
        未募集
      </Button>
    );

    if (this.state.recruiting) {
      joinButton = (
        <Button
          variant="contained"
          size="large"
          color="secondary"
          startIcon={<PostAdd />}
        >
          参加申込
        </Button>
      );
    }

    return (
      <>
        <h1 className={CommonStyle.content_title}>{this.state.name}</h1>
        <Divider />
        <div className={styles.pdetail_content}>
          <div className={styles.pdetail_introduction}>
            <div className={styles.pdetail_property}>
              {this.state.createdAt} 作成
              <Favorite style={favIconStyle} />
              {this.state.favs}
            </div>
            {this.state.introduction}
          </div>
          <Divider orientation="vertical" flexItem />
          <div className={styles.pdetail_property_wrapper}>
            <h3>参加を申し込む</h3>
            <Divider light />
            <div className={styles.contents_wrapper + " " + styles.join_button}>
              {joinButton}
            </div>
            <h3>プロジェクト作成者</h3>
            <Divider light />
            <div className={styles.contents_wrapper}>
              <Avater uuid={this.state.createdUser} />
            </div>

            <h3>タグ</h3>
            <Divider light />
            <div className={styles.contents_wrapper}>
              {this.state.tags.map((tag, index) => (
                <ListElementTag caption={tag.name} key={index} />
              ))}
            </div>

            <h3>参加者</h3>
            <Divider light />
            <div className={styles.contents_wrapper}>
              {this.state.member.map((people, index) => (
                <Avater uuid={people} key={index} hiddenName />
              ))}
            </div>

            <h3>関連サイト</h3>
            <Divider light />
            <div className={styles.contents_wrapper}>
              {this.state.sites.map((site, index) => (
                <div key={index}>
                  <div className={styles.pdetail_site_title}>{site[0]}</div>
                  <div className={styles.pdetail_site_url}>
                    <Link color="secondary" href={site[1]}>
                      {site[1]}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ShareButtons
          pathName={this.props.location.pathname}
          introduction={this.state.introduction}
          projectName={this.state.name}
        />
      </>
    );
  }
}

export default ProjectDetailPage;
