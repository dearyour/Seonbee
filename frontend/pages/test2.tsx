import Join from "components/account/Join";
import React from "react";
import Image from "next/image";
import lantern7 from "public/images/lantern7.png";
type Props = {};

const test = (props: Props) => {
  return (
    <div className="postCardWrp">
      <div className="postCard">
        <div className="post__img">
          <div className="ImagecardWrp">
            <Image src={lantern7} alt="cardImage" width={500} height={300} />
          </div>
        </div>
        <div className="post__info">
          <div className="post__date">
            <span>Sunday</span>
            <span>October 27 2019</span>
          </div>
          <h1 className="post__title">shark sighting</h1>
          <p className="post__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            tenetur commodi natus quidem maiores dolorum distinctio. Cumque
            facilis exercitationem quaerat magnam et ipsum in vero, earum dolore
            cupiditate veritatis ab.
          </p>
          <a href="" className="post_cta">
            Read more
          </a>
          <a href="" className="post_cta">
            Read mored
          </a>
        </div>
      </div>
    </div>
  );
};

export default test;
