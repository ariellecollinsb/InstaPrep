import React from "react";

class RandomImageHeader extends React.PureComponent {
  render() {
    let image = Math.ceil(Math.random() * 6).toString();
    return <>
      <div
        style={{
          backgroundImage:
            "url(" + require(`../../assets/img/header-bgs/${image}.jpg`) + ")"
        }}
        className="page-header page-header-xs"
        data-parallax={true}
      >
        <div className="filter" />
      </div>
    </>
  }
}
export default RandomImageHeader;
