import { useRouter } from "next/router";
import React from "react";
import PixelvaultNavbar from "../../components/PixelvaultNavbar";
import { useAddress, useContract, useNFTs, useOwnedNFTs } from "@thirdweb-dev/react";
import NFTCard from "../../components/NFTCard";
import { Card, Skeleton } from "@nextui-org/react";
import Link from "next/link";
import { NFT_CONTRACT_ADDRESS } from "../../const/addresses";

const NFTCollections = () => {
  const router = useRouter();
  const address = useAddress()
  const { contract } = useContract(
    router.query.nftcollectionid
  );
  const { data, isLoading, error } = useNFTs(contract);
  console.log(data)
  return (
    <>
      <PixelvaultNavbar />
      {(isLoading)?(
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
      ):(
      <div className="flex flex-wrap gap-10 justify-center md:justify-normal md:m-10">
        {data.map((item,index)=>{
            return (<NFTCard key={index} nftdata={item}/>)
        })}
      </div>
      )}
    </>
  );
};

export default NFTCollections;
