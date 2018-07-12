import Kdere from "../../assets/images/k-dere.png";
import ImoBridge from "../../assets/images/imo-bridge.png";
import PhRoad from "../../assets/images/ph-road.png";
import Class from "../../assets/images/class.png";
import EnuguRoad from "../../assets/images/enugu-road.png";
import Ajegunle from "../../assets/images/ajegunle.png";
import ellipse from "../../assets/ellipse.png";
import si from "../../assets/group.png";

const init = {
  projects: {
    ongoing: [
      {
        id: 1,
        title: "K-Dere Oil Spill Clean-up",
        funder: "Sustainability International",
        description: `A bold initiative to restore hectares of farmland devastated by decades of oil spills`,
        percentage: 50,
        picture: Kdere,
        fundingTarget: "$10,000.00",
        amountRaised: "$5,000.00",
        funderPicture: si
      },
      {
        id: 2,
        title: "Imo Bridge Construction",
        funder: "Berger and Sons Ltd.",
        description: `Construction of a bridge to connect the hinterlands for easier flow of commerce`,
        percentage: 90,
        picture: ImoBridge,
        fundingTarget: "$10,000.00",
        amountRaised: "$9,000.00",
        funderPicture: ellipse
      },
      {
        id: 3,
        title: "Port-Harcourt Road Construction",
        funder: "Sustainability International",
        description: `A 10km road to link the rural areas in Port-Harcourt to the city`,
        percentage: 30,
        fundingTarget: "$10,000.00",
        amountRaised: "$3,000.00",
        picture: PhRoad,
        funderPicture: si
      }
    ],
    proposed: [
      {
        id: 4,
        title: "Yenagoa Classroom Blocks",
        funder: "Sustainability International",
        description: `Construction of five classroom blocks to improve education standards`,
        percentage: 0,
        picture: Class,
        funderPicture: si,
        fundingTarget: "$10,000.00",
        amountRaised: "$0.00"
      },
      {
        id: 5,
        title: "Enugu Road Construction",
        funder: "Sustainability International",
        description: `A 10km road to link the rural areas in Enugu to the city`,
        percentage: 10,
        fundingTarget: "$10,000.00",
        amountRaised: "$1,000.00",
        picture: EnuguRoad,
        funderPicture: si
      },
      {
        id: 6,
        title: "Ajegunle Housing Units",
        funder: "Berger and Sons Ltd.",
        description: `Construction of housing units to provide accomodation for low-income families`,
        percentage: 0,
        funderPicture: ellipse,
        picture: Ajegunle,
        fundingTarget: "$10,000.00",
        amountRaised: "$0.00"
      }
    ]
  }
};

export default (state = init, payload) => {
  switch (payload.type) {
    default:
      return state;
  }
};
