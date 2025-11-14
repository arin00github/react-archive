"use client";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import { IDiplomacyDetail } from "@/interfaces/deplomacy";
import DiplomacyApiFactory from "@/service/frontend/DiplomacyApiFactory";
import { BasicButton } from "@/components/_common/style/BasicButton";
import media from "@/styles/media";
import { Loading } from "@/components/_common/loading/Loading";

const StyledPopup = styled.div`
  //height: calc(100vh - 80px);
  position: fixed;
  background-color: ${({ theme }) => theme.custom.color.background};
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

  .loadingBox {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

interface PopupProps {
  handleClose: () => void;
  selectedCountryIos: string;
}
const Popup = (props: PopupProps) => {
  const { selectedCountryIos, handleClose } = props;

  const { data, isError, isFetching, isLoading } =
    useQuery<IDiplomacyDetail | null>({
      queryKey: ["get-diplomacy-detail-country", selectedCountryIos],
      queryFn: async () => {
        const res = await DiplomacyApiFactory.getDiplomacyDetail(
          (props.selectedCountryIos as string) || ""
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = await res.json();
        if (res.status === 200) {
          return {
            flag: data.flag.response.body.items.item[0],
            economy: data.economy.response.body.items.item[0],
            general: data.general.response.body.items.item[0],
          };
        }
        return null;
      },
    });

  const isLoadingState = isFetching || isLoading;
  console.log("data", data);

  return (
    <StyledPopup>
      <div className="header">
        <BasicButton className="closeBtn" onClick={handleClose}>
          X
        </BasicButton>
      </div>
      {!isLoadingState && !isError && data && (
        <div className="container">
          <div className="title">
            <div className="">{data.economy?.country_nm ?? ""}</div>
          </div>
          {data.flag?.download_url && (
            <div className="flag">
              <img src={data.flag?.download_url} alt="country-flag" />
            </div>
          )}
          <div className="info">
            <div className="row">
              <div className="label">Name</div>
              <div className="value">{data.economy?.country_nm ?? ""}</div>
            </div>
            <div className="row">
              <div className="label">Name (eng)</div>
              <div className="value">{data.economy?.country_eng_nm ?? ""}</div>
            </div>
            <div className="row">
              <div className="label">GDP</div>
              <div className="value">{data.economy?.gdp ?? ""}</div>
            </div>
          </div>
        </div>
      )}
      {isLoadingState && (
        <div className="loadingBox">
          <Loading />
        </div>
      )}
    </StyledPopup>
  );
};

export default Popup;
