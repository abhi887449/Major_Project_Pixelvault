import React from "react";
import { Card, CardHeader, CardBody, Image, Skeleton } from "@nextui-org/react";
import { ThirdwebNftMedia, useContract, useValidDirectListings } from "@thirdweb-dev/react";
import { MARKETPLACE_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS } from "../const/addresses";
import Link from "next/link";

const NFTCard = (props) => {
  const { nftdata } = props;
  const { contract } = useContract(MARKETPLACE_CONTRACT_ADDRESS, "marketplace-v3");
  const {
    data: directListings,
    isLoading,
    error,
  } = useValidDirectListings(contract, {
    tokenContract: NFT_CONTRACT_ADDRESS, // Only show NFTs from this collection
    tokenId: nftdata?.metadata.id // Only show NFTs with this token ID
  });
  return (
    <Link  href={`/nftdetail/${NFT_CONTRACT_ADDRESS}/${nftdata?.metadata?.id}`}>
    <Card className="max-w-[350px] min-w-[250px]  min-h-[300px]" isPressable>
      <CardBody className="overflow-visible p-0">
        <ThirdwebNftMedia className="mt-5 mb-3 max-h-[200px] max-w-[250px] min-w-[200px] rounded-xl" metadata={nftdata.metadata}></ThirdwebNftMedia>
      </CardBody>
      <CardBody className="p-0 ml-5 mr-5 mb-5 flex-col items-start">
        <p className="text-lg uppercase font-bold">{nftdata?.metadata.name}</p>
        <small className="text-default-500">
          {nftdata?.metadata.description}
        </small>
        {isLoading?(<Skeleton className="w-36 h-5 rounded-md"></Skeleton>):directListings && directListings[0]? (<div className="text-success">Price: {`${directListings[0]?.currencyValuePerToken.displayValue} ${directListings[0]?.currencyValuePerToken.symbol}`}</div>):(<div className="text-danger">Not Listed</div>)}
        
      </CardBody>
    </Card>
    </Link>
  );
};

export default NFTCard;
