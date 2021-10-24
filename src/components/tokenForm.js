import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Button, ButtonGroup, Grid, InputLabel, Select, MenuItem } from "@mui/material";
import { ContractContext } from "../contexts/ContractContext.js";

export default function Form() {
  const [selectedToken, setSelectedToken] = React.useState("0");
  const { owedTokens, getTokenDetails, getOwedTokens, nameToken, minterc20, adventureUp, petToken, burnToken, levelUptoken,stakeTokens, unstakeTokens } = React.useContext(ContractContext)
  const [selectedContract, setSelectedContract] = React.useState("0x000");

  const handleChangeToken = (e) => {
    const id = e.target.value || "0"
    getTokenDetails(id)
    setSelectedToken(id);
  };

  const handleSetContract= (event) => {
    setSelectedContract(event.target.value);
  };

  const handleName = async () => {
    const input = document.querySelector('#tokenName')
    nameToken(selectedToken, input.value)
  }

  const handleClaim = async () => {
    const input = document.querySelector('#tokenId')
    minterc20(input.value)
  }

  const handleAdventure = () => {
    const input = document.querySelector('#tokenId')
    adventureUp(input.value)
  }

  const handleBurnToken = () => {
    const input = document.querySelector('#tokenId')
    burnToken(input.value)
  }

  const handleLevelUp = () => {
    const input = document.querySelector('#tokenId')
    levelUptoken(input.value)
  }

  const handlePetToken = () => {
    const input = document.querySelector('#tokenId')
    petToken(input.value)
  }

  const handleViewTokens = () => {
    const input = document.querySelector('#owedTokens')
    getOwedTokens(input.value)
  }

  const handleStakeTokens = () => {
    const input = document.querySelector('#tokenStake')
    stakeTokens(input.value)
  }

  const handleUnStakeTokens = () => {
    const input = document.querySelector('#tokenStake')
    unstakeTokens(input.value)
  }
  

  return (
    <Box style={{ padding: "5px" }}>
      <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Contract</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedContract}
          label="Token Contract"
          onChange={handleSetContract}
        >
          <MenuItem value={'selectedContract'}></MenuItem>
          <MenuItem value={'0x001'}></MenuItem>
          <MenuItem value={'0x002'}></MenuItem>
        </Select>
        <TextField
          id="tokenId"
          label="Input Token ID Here"
          variant="outlined"
          fullWidth
          value={selectedToken}
          style={{ marginTop: "10px" }}
          onChange={handleChangeToken}
        />
      </FormControl>
      <Grid container style={{ alignItems: "center" }}>
        <Grid item xs={10}>
          <TextField
            id="tokenName"
            label="Name Token"
            variant="outlined"
            fullWidth
            style={{ marginTop: "10px" }}
          />
        </Grid>
        <Grid
          item
          xs={2}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            variant="contained"
            onClick={handleName}
          >
            Call
          </Button>
        </Grid>
      </Grid>

      <Grid container style={{ alignItems: "center" }}>
        <Grid item xs={10}>
          <TextField
            id="owedTokens"
            value={owedTokens}
            variant="outlined"
            fullWidth
            style={{ marginTop: "10px" }}
            disabled
          />
        </Grid>
        <Grid
          item
          xs={2}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            variant="contained"
            onClick={handleViewTokens}
          >
            Call
          </Button>
        </Grid>
      </Grid>

      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        style={{ marginTop: "10px" }}
      >
        <Button onClick={handleLevelUp}>Level Up</Button>
        <Button onClick={handleBurnToken}>Burn Token</Button>
        <Button onClick={handlePetToken}>Pet Token</Button>
        <Button onClick={handleAdventure}>Adventure</Button>
        <Button onClick={handleClaim}>Claim</Button>
      </ButtonGroup>

      <Grid container style={{ alignItems: "center" }}>
        <Grid item xs={10}>
          <TextField
            id="tokenStake"
            label="Stake Tokens"
            variant="outlined"
            fullWidth
            style={{ marginTop: "10px" }}
          />
        </Grid>
      </Grid>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        style={{ marginTop: "10px" }}
      >
        <Button onClick={handleStakeTokens}>Stake Tokens</Button>
        <Button onClick={handleUnStakeTokens}>Unstake Tokens</Button>
      </ButtonGroup>
    </Box>
  );
}
