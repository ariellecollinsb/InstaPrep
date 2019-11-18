import React from "react";
import { Button, Container } from "reactstrap";

function HomePageHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  let image = Math.ceil(Math.random() * 6).toString();

  return (
      <>
        <div
          style={{
            backgroundImage: "url(" + require(`../../assets/img/header-bgs/${image}.jpg`) + ")"

          }}
          className="page-header"
          data-parallax={true}
          ref={pageHeader}
        >
          <div className="filter" />
          <Container>
            <div className="motto text-center">
              <h1>InstaPrep</h1>
              <h3>Plan your week. </h3>
              <br />
              <Button className="btn-round" color="success" type="button" outline>
                Get Started
              </Button> 
            </div>
          </Container>
        </div>
      </>
    );
}

export default HomePageHeader;