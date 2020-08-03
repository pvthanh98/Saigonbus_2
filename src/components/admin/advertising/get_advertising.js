import React from "react";
import UploadVideo from "./upload_video";
import WatchAd from "./watchAdvertising";
import {animateScroll as scroll} from 'react-scroll';
import Loading from "../../extention/load";
import axios from "../../extention/aixosCustom";
class Advertising extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadProgress: 0,
      isLoad: false,
      isLoadMedia: true,
      ad_list: [],
      errors: [],
      src: localStorage.getItem("src_advertising"),
    };
  }

  onLoadMedia = () => {
    this.setState({
      isLoadMedia: true,
    });
    axios()
      .get("https://sensorhub.tech/api/get_upload")
      .then((res) => {
        if (res.status === 200)
          this.setState({
            ad_list: res.data,
            isLoadMedia: false,
          });
          scroll.scrollToTop();
      }).catch((err)=>{
        if(err.status===401){
          alert("Bạn đăng nhập lại")
          localStorage.removeItem('token');
        }
        console.log(err)
      })
  };
  componentDidMount() {
    this.onLoadMedia();
    scroll.scrollToTop();
    scroll.scrollToTop();
  }

  onLoadVideo = (data) => {
    this.setState({
      loadProgress: data.loadProgress,
      isLoad: data.isLoad,
    });
    if(data.loadProgress===0) this.onLoadMedia();
  };

  onStatusUpload = (status) => {
    this.setState({
      errors: status.errors,
    });
    console.log(status.errors);
  };

  openAd = (src) => {
    this.setState({
      src: src,
    });
  };

  onDeleteMedia = (media_id) => {
    var body = {
      media_id,
    };
    axios()
      .post("https://sensorhub.tech/delete_media", body)
      .then((res) => {
        console.log(res);
        this.onLoadMedia();
      })
      .catch((err) => {
        console.log(err)
      });
  };
  render() {
    var errors = this.state.errors.map((err, index) => (
      <span key={index}>{err}</span>
    ));
    var { ad_list } = this.state;

    var ads = ad_list.map((ad, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{ad.media_name}</td>
          <td className="text-center">
            <a
              onClick={() =>
                this.openAd(
                  "https://sensorhub.tech/uploads/media/" + ad.media_name
                )
              }
              data-toggle="modal"
              data-target="#watchAd"
              className="btn btn-round btn-fill btn-info"
            >
              <span className="glyphicon glyphicon-edit"></span> Xem
            </a>
            <a
              onClick={() => this.onDeleteMedia(ad._id)}
              className="btn btn-round btn-fill btn-info btn-delete-custom ml-2"
            >
              <span className="glyphicon"></span> Xóa
            </a>
          </td>
        </tr>
      );
    });
    return (
      <div className="col-md-12">
        <div className="card">
          <div className="card-header card-header-primary">
            <h4 className="card-title ">Quảng cáo</h4>
            <p className="card-category">Danh sách quảng có sẳn</p>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                <b>+ </b> Thêm mới
              </button>
              {this.state.errors.length > 0 ? (
                <div className="alert alert-danger mt-2">{errors}</div>
              ) : (
                ""
              )}
              {this.state.isLoad ? (
                <div style={{ fontSize: "29px" }}>
                  {this.state.loadProgress} %
                </div>
              ) : (
                ""
              )}
              {this.state.isLoad ? <Loading /> : ""}
              <table className="table">
                <thead className=" text-primary">
                  <tr>
                    <th>STT</th>
                    <th>Tên quảng cáo</th>
                    <th className="text-center">Tùy chọn</th>
                  </tr>
                </thead>
                <tbody>{ads}</tbody>
              </table>
              {this.state.isLoadMedia ? <Loading /> : ""}
            </div>
            <UploadVideo
              ad_list={this.state.ad_list}
              onStatusUpload={this.onStatusUpload}
              onGetInfo={this.onLoadVideo}
            />
            <WatchAd srcAdvertising={this.state.src} />
          </div>
        </div>
      </div>
    );
  }
}

export default Advertising;
