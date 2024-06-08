import React from "react";
import { Card, CardHeader, CardBody, Image, Skeleton } from "@nextui-org/react";
import {
  ThirdwebNftMedia,
  useContract,
  useNFT,
  useValidDirectListings,
} from "@thirdweb-dev/react";
import {
  MARKETPLACE_CONTRACT_ADDRESS,
  NFT_CONTRACT_ADDRESS,
} from "../const/addresses";
import NFTAction from "./NFTAction";

const NFTDetailCard = (props) => {
  const { tokenid } = props;
  const { contract:nftcontract } = useContract(NFT_CONTRACT_ADDRESS);
  const {
    data: nftdata,
    isLoading: nftloading,
    error: nfterror,
  } = useNFT(nftcontract, tokenid);
  const { contract:marketplacecontract } = useContract(MARKETPLACE_CONTRACT_ADDRESS, "marketplace-v3");
  const {
    data: directListings,
    isLoading:marketplaceloading,
    error,
  } = useValidDirectListings(marketplacecontract, {
    tokenContract: NFT_CONTRACT_ADDRESS, // Only show NFTs from this collection
    tokenId: tokenid // Only show NFTs with this token ID
  });
  console.log(directListings)
  return (
    <>
      {nftloading && marketplaceloading ? (
        <div className="flex flex-col sm:flex-row justify-center m-10 gap-5">
          <Card className="w-[250px] h-[300px]">
            <Skeleton className="m-5 mb-0 h-[200px] max-w-[250px] min-w-[200px] rounded-lg"></Skeleton>
            <Skeleton className="mt-2 ml-5 mr-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
            <Skeleton className="mt-2 mb-5 mr-5 ml-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
          </Card>
          <Card className="w-[300px] h-[300px]">
            <Skeleton className="w-2/5 rounded-full m-5 mb-3">
              <div className="h-8 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="max-w-[300px] w-full flex items-center gap-3 mb-5 ml-5">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
            <Skeleton className="rounded-lg ml-5 mr-5">
              <div className="h-24 rounded-lg bg-default-300"></div>
            </Skeleton>
          </Card>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row justify-center m-10 gap-5">
          <Card
            className="max-w-[350px] min-w-[250px]  min-h-[300px]"
            isPressable
          >
            <CardBody className="overflow-visible p-0">
              <Skeleton isLoaded={!false}>
                <ThirdwebNftMedia
                  className="mt-5 mb-3 max-h-[200px] max-w-[250px] min-w-[200px] rounded-xl"
                  metadata={nftdata?.metadata}
                ></ThirdwebNftMedia>
              </Skeleton>
            </CardBody>
            <CardBody className="p-0 ml-5 mr-5 mb-5 flex-col items-start">
              <small className="font-bold">Description</small>
              <small className="text-default-500">
                {nftdata?.metadata.description}
              </small>
            </CardBody>
          </Card>
          <NFTAction nftdata={nftdata} directListings={directListings} marketplacecontract={marketplacecontract} nftcontract={nftcontract}/>
        </div>
      )}
    </>
  );
};

export default NFTDetailCard;
