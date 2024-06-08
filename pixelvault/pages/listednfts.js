import { useRouter } from "next/router";
import React from "react";
import PixelvaultNavbar from "../components/PixelvaultNavbar";
import {
    ThirdwebNftMedia,
  useAddress,
  useContract,
  useDirectListings,
  useNFTs,
  useOwnedNFTs,
  useValidDirectListings,
} from "@thirdweb-dev/react";
import NFTCard from "../components/NFTCard";
import { Card, CardBody, Skeleton } from "@nextui-org/react";
import Link from "next/link";
import {
  MARKETPLACE_CONTRACT_ADDRESS,
  NFT_CONTRACT_ADDRESS,
} from "../const/addresses";

const ListedNFTs = () => {
  const router = useRouter();
  const address = useAddress();
  const { contract } = useContract(NFT_CONTRACT_ADDRESS);
  const { data, isLoading, error } = useNFTs(contract);
  const { contract: marketplacecontract } = useContract(
    MARKETPLACE_CONTRACT_ADDRESS,
    "marketplace-v3"
  );
  const {
    data: directListings,
    isLoading: marketplacecontractisloading,
    error: marketplacecontracterror,
  } = useValidDirectListings(marketplacecontract);
  console.log(directListings);
  return (
    <>
      <PixelvaultNavbar />
      {marketplacecontractisloading ? (
        <div className="flex flex-wrap gap-10 justify-center md:justify-normal md:m-10">
          <Card className="max-w-[350px] min-w-[250px]  min-h-[300px]">
            <Skeleton className="m-5 mb-0 h-[200px] max-w-[250px] min-w-[200px] rounded-lg"></Skeleton>
            <Skeleton className="mt-2 ml-5 mr-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
            <Skeleton className="mt-2 mb-5 mr-5 ml-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
          </Card>
          <Card className="max-w-[350px] min-w-[250px]  min-h-[300px]">
            <Skeleton className="m-5 mb-0 h-[200px] max-w-[250px] min-w-[200px] rounded-lg"></Skeleton>
            <Skeleton className="mt-2 ml-5 mr-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
            <Skeleton className="mt-2 mb-5 mr-5 ml-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
          </Card>
          <Card className="max-w-[350px] min-w-[250px]  min-h-[300px]">
            <Skeleton className="m-5 mb-0 h-[200px] max-w-[250px] min-w-[200px] rounded-lg"></Skeleton>
            <Skeleton className="mt-2 ml-5 mr-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
            <Skeleton className="mt-2 mb-5 mr-5 ml-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
          </Card>
          <Card className="max-w-[350px] min-w-[250px]  min-h-[300px]">
            <Skeleton className="m-5 mb-0 h-[200px] max-w-[250px] min-w-[200px] rounded-lg"></Skeleton>
            <Skeleton className="mt-2 ml-5 mr-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
            <Skeleton className="mt-2 mb-5 mr-5 ml-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
          </Card>
          <Card className="max-w-[350px] min-w-[250px]  min-h-[300px]">
            <Skeleton className="m-5 mb-0 h-[200px] max-w-[250px] min-w-[200px] rounded-lg"></Skeleton>
            <Skeleton className="mt-2 ml-5 mr-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
            <Skeleton className="mt-2 mb-5 mr-5 ml-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
          </Card>
          <Card className="max-w-[350px] min-w-[250px]  min-h-[300px]">
            <Skeleton className="m-5 mb-0 h-[200px] max-w-[250px] min-w-[200px] rounded-lg"></Skeleton>
            <Skeleton className="mt-2 ml-5 mr-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
            <Skeleton className="mt-2 mb-5 mr-5 ml-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
          </Card>
          <Card className="max-w-[350px] min-w-[250px]  min-h-[300px]">
            <Skeleton className="m-5 mb-0 h-[200px] max-w-[250px] min-w-[200px] rounded-lg"></Skeleton>
            <Skeleton className="mt-2 ml-5 mr-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
            <Skeleton className="mt-2 mb-5 mr-5 ml-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
          </Card>
          <Card className="max-w-[350px] min-w-[250px]  min-h-[300px]">
            <Skeleton className="m-5 mb-0 h-[200px] max-w-[250px] min-w-[200px] rounded-lg"></Skeleton>
            <Skeleton className="mt-2 ml-5 mr-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
            <Skeleton className="mt-2 mb-5 mr-5 ml-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
          </Card>
          <Card className="max-w-[350px] min-w-[250px]  min-h-[300px]">
            <Skeleton className="m-5 mb-0 h-[200px] max-w-[250px] min-w-[200px] rounded-lg"></Skeleton>
            <Skeleton className="mt-2 ml-5 mr-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
            <Skeleton className="mt-2 mb-5 mr-5 ml-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
          </Card>
          <Card className="max-w-[350px] min-w-[250px]  min-h-[300px]">
            <Skeleton className="m-5 mb-0 h-[200px] max-w-[250px] min-w-[200px] rounded-lg"></Skeleton>
            <Skeleton className="mt-2 ml-5 mr-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
            <Skeleton className="mt-2 mb-5 mr-5 ml-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
          </Card>
        </div>
      ) : (
        <div className="flex flex-wrap gap-10 justify-center md:justify-normal md:m-10">
          {directListings.map((item, index) => {
            return (
              <Link
                href={`/nftdetail/${NFT_CONTRACT_ADDRESS}/${item?.asset?.id}`}
                id="index"
              >
                <Card
                  className="max-w-[350px] min-w-[250px]  min-h-[300px]"
                  isPressable
                >
                  <CardBody className="overflow-visible p-0">
                    <ThirdwebNftMedia
                      className="mt-5 mb-3 max-h-[200px] max-w-[250px] min-w-[200px] rounded-xl"
                      metadata={item?.asset}
                    ></ThirdwebNftMedia>
                  </CardBody>
                  <CardBody className="p-0 ml-5 mr-5 mb-5 flex-col items-start">
                    <p className="text-lg uppercase font-bold">
                      {item?.asset?.name}
                    </p>
                    <small className="text-default-500">
                      {item?.asset?.description}
                    </small>
                      <div className="text-success">
                        Price:{" "}
                        {`${directListings[0]?.currencyValuePerToken.displayValue} ${directListings[0]?.currencyValuePerToken.symbol}`}
                      </div>
                  </CardBody>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ListedNFTs;
