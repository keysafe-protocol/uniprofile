import React, { FC } from "react";


interface IIdentityItem {
  src: string,
  link: string
}
const IdentityItem: FC<IIdentityItem> = ({ src, link }) => {
  return <div className="my-3 mr-5 inline-block cursor-pointer">
    <a href={link} target="__blank">
      <img src={src} alt="" width={200} max-height={30} />
    </a>
  </div>
}
const identities = [
  {
    name: "zcloak",
    image: "/zcloak.png",
    link: "https://zcloak.network/#/"
  },
  {
    name: "galaxy",
    image: "/galaxy.png",
    link: "https://galaxy.eco/"
  }, {
    name: "cyberconnect",
    image: "/cyberconnect.png",
    link: "https://cyberconnect.me/",
  }
]
const Web3Identicials = () => {
  return <div className="mt-20 rounded-sm border-1 bg-white px-10 py-5">
    <div className=" text-lg">You can active your following Web3 identities</div>
    <div >
      {
        identities.map(({ name, image, link }) => <IdentityItem src={image} link={link} />)
      }
    </div>
    {/* <Button>Disconnect</Button> */}
  </div>
}
export default Web3Identicials