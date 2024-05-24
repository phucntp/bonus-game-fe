import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SelectComponent = ({valueSelect, onChangeSelect}) => {
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    setSelectedOption(valueSelect)
  }, [valueSelect])

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    if(onChangeSelect) onChangeSelect(event.target.value)
  };

  return (
    <FormControl style={{margin: '5px', minWidth: 120}}>
      <InputLabel id="demo-simple-select-label">Chọn trạng thái</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedOption}
        onChange={handleChange}
      >
        <MenuItem value="active">Hoạt đông</MenuItem>
        <MenuItem value="inactive">Tạm ngưng</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SelectComponent;