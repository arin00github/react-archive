"use client";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { IoIosClose } from "react-icons/io";

import { IDiplomacyDetail } from "@/interfaces/deplomacy";
import DiplomacyApiFactory from "@/service/frontend/DiplomacyApiFactory";
import { useRouter } from "next/navigation";

const StyledPopup = styled.div`
  width: 300px;
  //height: calc(100vh - 80px);
  position: fixed;
  top: 120px;
  right: 40px;
  bottom: 40px;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 12px;
  box-shadow: 0px 7px 18px rgba(0, 0, 0, 0.1);
  z-index: 100;
  font-size: 14px;

  .header {
    display: flex;
    justify-content: flex-end;
    padding: 0 20px;
    margin-top: 20px;

    button {
      font-size: 10px;
      border: none;
      font-size: 14px;
    }

    .closeBtn {
      margin-left: 8px;
      padding: 0;
      width: 32px;
      line-height: 32px;
      height: 32px;
    }
  }

  .container {
    padding: 20px;
    .title {
      margin-bottom: 12px;
      font-size: 20px;
    }
    .flag {
      border: 1px solid #dadada;
      width: 100%;
      img {
        width: 100%;
      }
    }

    .row {
      display: flex;
      height: 32px;
      line-height: 32px;
      .label {
        width: 120px;
        flex: none;
      }
    }
  }
`;

interface PopupProps {
  handleClose: () => void;
  selectedCountryIos: string;
}
const Popup = (props: PopupProps) => {
  const router = useRouter();

  const { selectedCountryIos, handleClose } = props;
  const { data, isError } = useQuery<IDiplomacyDetail>({
    queryKey: ["get-deplomacy-selected-country", selectedCountryIos],
    queryFn: async () => {
      const res = await DiplomacyApiFactory.getDiplomacyDetail(
        props.selectedCountryIos
      );
      if (res.status === 200) {
        return res.data;
      }
      return null;
    },
  });
  console.log("data", data);

  return (
    <StyledPopup>
      <div className="header">
        <button
          onClick={() => {
            router.push(`/diplomacy/${selectedCountryIos}`);
          }}
        >
          Go Detail
        </button>
        <button className="closeBtn" onClick={handleClose}>
          <IoIosClose />
        </button>
      </div>
      {!isError && data && (
        <div className="container">
          <div className="title">
            <div className="">{data.economy.country_nm}</div>
          </div>
          {data.flag?.download_url && (
            <div className="flag">
              <img src={data.flag?.download_url} alt="country-flag" />
            </div>
          )}
          <div className="info">
            <div className="row">
              <div className="label">Name</div>
              <div className="value">{data.economy.country_nm}</div>
            </div>
            <div className="row">
              <div className="label">Name (eng)</div>
              <div className="value">{data.economy.country_eng_nm}</div>
            </div>
            <div className="row">
              <div className="label">GDP</div>
              <div className="value">{data.economy.gdp}</div>
            </div>
          </div>
        </div>
      )}
    </StyledPopup>
  );
};

export default Popup;
