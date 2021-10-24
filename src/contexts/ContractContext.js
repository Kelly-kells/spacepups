import React, { useContext, useState } from "react";
import { Web3Context } from "./Web3Context";
import config from "../config/";

const contractAbi = require("../config/contractabi.json");

export const ContractContext = React.createContext({});

export const ContractProvider = ({ children }) => {
    const tokenDataInitState = {
        id: "0000",
        name: "Null Token",
        level: "Null Level",
        pets: "Null Pets",
        battlesWon: "BWon",
        health: "Health",
        strength: "Strength",
        defense: "Defense",
        speed: "Speed",
        luck: "Luck",
        xp: "Xp",
    }

    const [tokenData, setTokenData] = useState(tokenDataInitState)
    const [owedTokens, setOwedTokens] = useState("0")

    const { web3, account } = useContext(Web3Context)

    const getContract = () => {
        if (!web3 || !account) throw new Error("Please connect metamask")
        return new web3.eth.Contract(contractAbi, config.contractAddress)
    }

    const getTokenDetails = async (tokenId) => {
        try {
            const contract = getContract()
            const res = await contract.methods.attrIndex(tokenId).call()
            const name = await contract.methods.viewTokenName(tokenId).call()
            const tokendata = { ...res, name }

            setTokenData(tokendata)
            return tokendata;
        } catch (error) {
            alert(`getTokenDetails: ${error.message}`)
            return error.message
        }
    }

    const getOwedTokens = async (tokenId) => {
        try {
            const contract = getContract()
            const owed = await contract.methods.viewOwedTokens(tokenId).call()
            setOwedTokens(owed)

            return owed;
        } catch (error) {
            alert(`getOwedTokens: ${error.message}`)
            return error.message
        }
    }

    const minterc20 = async (tokenId) => {
        try {
            const contract = getContract()
            await contract.methods.minterc20(tokenId).send({ from: account })
            return true
        } catch (error) {
            alert(`minterc20: ${error.message}`)
            return error.message
        }
    }

    const nameToken = async (tokenId, tokenName) => {
        try {
            const contract = getContract()
            await contract.methods.changeTokenName(tokenId, tokenName).send({ from: account })
            return true
        } catch (error) {
            alert(`nameToken: ${error.message}`)
            return error.message
        }
    }

    const adventureUp = async (tokenIndex) => {
        try {
            const contract = getContract()
            await contract.methods.adventure(tokenIndex).send({ from: account })
            return true
        } catch (error) {
            alert(`adventureUp: ${error.message}`)
            return error.message
        }
    }

    const petToken = async (tokenId) => {
        try {
            const contract = getContract()
            await contract.methods.petToken(tokenId).send({ from: account })
            return true
        } catch (error) {
            alert(`petToken: ${error.message}`)
            return error.message
        }
    }

    const burnToken = async (tokenId) => {
        try {
            const contract = getContract()
            await contract.methods.burn(tokenId).send({ from: account })
            return true
        } catch (error) {
            alert(`burnToken: ${error.message}`)
            return error.message
        }
    }

    const levelUptoken = async (tokenId) => {
        try {
            const contract = getContract()
            await contract.methods.levelUptoken(tokenId).send({ from: account })
            return true
        } catch (error) {
            alert(`levelUptoken: ${error.message}`)
            return error.message
        }
    }


    const stakeTokens = async (tokenId) => {
        try {
            const contract = getContract()
            await contract.methods.stakeTokens(tokenId).send({ from: account })
            return true
        } catch (error) {
            alert(`stakeTokens: ${error.message}`)
            return error.message
        }
    }
    const unstakeTokens = async (tokenId) => {
        try {
            const contract = getContract()
            await contract.methods.unstakeTokens(tokenId).send({ from: account })
            return true
        } catch (error) {
            alert(`unstakeTokens: ${error.message}`)
            return error.message
        }
    }

    return (
        <ContractContext.Provider value={{ tokenData, owedTokens, getTokenDetails, getOwedTokens, nameToken, minterc20, adventureUp, petToken, burnToken, levelUptoken, stakeTokens,unstakeTokens}}>
            {children}
        </ContractContext.Provider>
    )
}