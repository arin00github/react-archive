"use client";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { IoIosClose } from "react-icons/io";

import { IDiplomacyDetail } from "@/interfaces/deplomacy";
import DiplomacyApiFactory from "@/service/frontend/DiplomacyApiFactory";
import { useRouter } from "next/navigation";
import media from "@/styles/media";

const StyledPopup = styled.div`
  //height: calc(100vh - 80px);
  position: fixed;
  background-color: ${({ theme }) => theme.bg};
  top: 7.5rem;
  right: 2.5rem;
  bottom: 2.5rem;
  width: 18.75rem;
  transform: translate(0, 0);
  border-radius: 0.75rem;
  box-shadow: 0px 7px 18px rgba(0, 0, 0, 0.1);
  z-index: 100;
  font-size: 0.875rem;

  ${media.large`
    width: 50%;
    height: calc(100% - 180px);
    left: 50%;
    top: 80px;
    transform: translateX(-50%);
    `}

  ${media.medium`
    width: 80%;
  `}

  ${media.small`
    height: calc(100% - 180px);
      width: 100%;
    `}

  .header {
    display: flex;
    justify-content: flex-end;
    padding: 0 1.25rem;
    margin-top: 1.25rem;

    button {
      font-size: 0.625rem;
      border: none;
      font-size: 0.875rem;
    }

    .closeBtn {
      margin-left: 0.5rem;
      padding: 0;
      width: 2rem;
      line-height: 2rem;
      height: 2rem;
    }
  }

  .container {
    padding: 1.25rem;
    .title {
      margin-bottom: 0.75rem;
      font-size: 1.25rem;
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
      height: 2rem;
      line-height: 2rem;
      .label {
        width: 7.5rem;
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
