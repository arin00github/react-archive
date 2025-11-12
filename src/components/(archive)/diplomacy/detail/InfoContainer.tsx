"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { IDiplomacyDetail } from "@/interfaces/deplomacy";
import DiplomacyApiFactory from "@/service/frontend/DiplomacyApiFactory";
import styled from "styled-components";
import media from "@/styles/media";

const StyledContainer = styled.div`
  position: absolute;
  right: 10%;
  top: 12%;
  padding: 1.5rem;
  z-index: 1500;
  background-color: ${({ theme }) => theme.custom.color.background};
  box-shadow: 0px 0px 12px ${({ theme }) => theme.custom.color.navShadow};

  .container {
    overflow-y: auto;
    .header {
      margin-bottom: 0.75rem;
      button {
        font-size: 0.75rem;
        border: none;
      }
    }
    .body {
      display: flex;
      flex-direction: row;

      ${media.medium`
      flex-direction: column;
        `}

      .flag {
        max-width: 20rem;
        width: 100%;
        border: 1px solid #dadada;
        margin-bottom: auto;
        img {
          width: 100%;
        }
      }
      .infoSection {
        margin-left: 1.875rem;
        font-size: 0.813rem;

        h3 {
          font-size: 1.75rem;
          margin-bottom: 1.875rem;
        }

        .row {
          display: flex;
          height: 2.25rem;
          line-height: 2.25rem;

          .label {
            width: 7.5rem;
            flex: none;
          }
        }
      }
    }
  }
`;

interface IInfoContainer {
  country: string;
  handleClick: () => void;
}

const InfoContainer = (props: IInfoContainer) => {
  const params = useParams();
  // const router = useRouter();

  const { data, isError } = useQuery<IDiplomacyDetail | null>({
    queryKey: ["get-diplomacy-detail-country", params.country],
    queryFn: async () => {
      const res = await DiplomacyApiFactory.getDiplomacyDetail(
        (props?.country as string) || ""
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = await res.json();
      console.log("data", data);
      if (res.status === 200) {
        //return res.data;
        return {
          flag: data.flag.response.body.items.item[0],
          economy: data.economy.response.body.items.item[0],
          general: data.general.response.body.items.item[0],
        };
      }
      return null;
    },
  });
  console.log("data", data);
  console.log("isError", isError);

  return (
    <StyledContainer>
      {!isError && data && (
        <div className="container">
          <div className="header">
            <button onClick={() => props.handleClick()}>목록으로</button>
          </div>
          <div className="body">
            {data.flag?.download_url && (
              <div className="flag">
                <img src={data.flag?.download_url} alt="country-flag" />
              </div>
            )}
            <div className="infoSection">
              <h3>{data.economy.country_nm}</h3>
              <div className="row">
                <div className="label">Name</div>
                <div className="value">{data.economy?.country_nm}</div>
              </div>
              <div className="row">
                <div className="label">Name (eng)</div>
                <div className="value">{data.economy.country_eng_nm}</div>
              </div>
              <div className="row">
                <div className="label">Language</div>
                <div className="value">{data.general.lang}</div>
              </div>
              <div className="row">
                <div className="label">Capital</div>
                <div className="value">{data.general.capital}</div>
              </div>
              {data.general.climate && (
                <div className="row">
                  <div className="label">Climate</div>
                  <div className="value">{data.general.climate}</div>
                </div>
              )}
              <div className="row">
                <div className="label">Area</div>
                <div className="value">{data.general.area}</div>
              </div>
              <div className="row">
                <div className="label">GDP</div>
                <div className="value">{data.economy.gdp}</div>
              </div>
              <div className="row">
                <div className="label">Import</div>
                <div className="value">{data.economy.import_amount}</div>
              </div>
              <div className="row">
                <div className="label">Export</div>
                <div className="value">{data.economy.export_amount}</div>
              </div>
              <div className="row">
                <div className="label">Currency</div>
                <div className="value">{data.economy.currency_unit}</div>
              </div>
              <div className="row">
                <div className="label">Population</div>
                <div className="value">{data.general.population}</div>
              </div>
              {data.economy.main_resource && (
                <div className="row">
                  <div className="label">Resource</div>
                  <div className="value">{data.economy.main_resource}</div>
                </div>
              )}
              {data.economy.main_industry && (
                <div className="row">
                  <div className="label">Industry</div>
                  <div className="value">{data.economy.main_industry}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </StyledContainer>
  );
};

export default InfoContainer;
