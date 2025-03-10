"use client";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import { IDiplomacyDetail } from "@/interfaces/deplomacy";
import DiplomacyApiFactory from "@/service/frontend/DiplomacyApiFactory";

const StyledPopup = styled.div`
  width: 300px;
  //height: calc(100vh - 80px);
  position: fixed;
  top: 120px;
  right: 40px;
  bottom: 40px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 7px 18px rgba(0, 0, 0, 0.1);
  z-index: 100;
  font-size: 14px;

  .header {
    display: flex;
    justify-content: flex-end;
    padding: 0 20px;
    margin-top: 20px;

    .closeBtn {
      font-size: 10px;
    }
  }

  .container {
    padding: 20px;
    .flag {
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
        <button className="closeBtn" onClick={handleClose}>
          Close
        </button>
      </div>
      {!isError && data && (
        <div className="container">
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
            {data.economy.ecnmy_growth_rate && (
              <div className="row">
                <div className="label">Growth Rate</div>
                <div className="value">{data.economy.ecnmy_growth_rate}%</div>
              </div>
            )}
          </div>
        </div>
      )}
    </StyledPopup>
  );
};

export default Popup;
