import React from "react";
import "./blobs.css";


export const Blobs = ({colors}) => {
    return (
        <>
            <div className="blob" id="blob1">
                <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="100%" id="blobSvg">
                    <path id="blob" d="M483,297Q476,344,414.5,348.5Q353,353,348.5,415Q344,477,297,461.5Q250,446,219.5,421.5Q189,397,157,386Q125,375,107.5,345.5Q90,316,62.5,283Q35,250,38,207Q41,164,110,171.5Q179,179,167,99.5Q155,20,202.5,65.5Q250,111,281,105.5Q312,100,351,105Q390,110,384.5,153.5Q379,197,434.5,223.5Q490,250,483,297Z" fill={colors[0]}></path>
                </svg>
            </div>

            <div className="blob" id="blob2">
                <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="100%" id="blobSvg">
                    <path id="blob2" d="M483,297Q476,344,414.5,348.5Q353,353,348.5,415Q344,477,297,461.5Q250,446,219.5,421.5Q189,397,157,386Q125,375,107.5,345.5Q90,316,62.5,283Q35,250,38,207Q41,164,110,171.5Q179,179,167,99.5Q155,20,202.5,65.5Q250,111,281,105.5Q312,100,351,105Q390,110,384.5,153.5Q379,197,434.5,223.5Q490,250,483,297Z" fill={colors[1]}></path>
                </svg>
            </div>
        </>
    )
}