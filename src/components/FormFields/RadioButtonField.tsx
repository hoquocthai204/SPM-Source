import * as React from 'react';
import FormItem from 'antd/lib/form/FormItem';
import { Radio } from 'antd';
interface IRadiButtonFieldProps {
  values: Array<string>;
  className?: string;
  onChangeButton: (value: any) => void;
}

const RadiButtonField: React.FunctionComponent<IRadiButtonFieldProps> = (props) => {
  const {onChangeButton} = props
  const hanldeOnClick = (event: any) => {
    if(event.target.getAttribute('data-waschecked') === 'true') {
      event.target.parentElement.parentElement.classList.remove('ant-radio-button-wrapper-checked')
      // event.target.parentElement.classList.remove('ant-radio-button-checked')
      event.target.checked = false;
      event.target.dataset.waschecked = false;
      onChangeButton(0);
    } else if(event.target.getAttribute('data-waschecked') === 'false'){
      event.target.dataset.waschecked = true
      event.target.parentElement.parentElement.classList.add('ant-radio-button-wrapper-checked')
      event.target.parentElement.classList.add('ant-radio-button-checked')
      onChangeButton(event.target.value)
    }
    // onChangeButton(0);
    const listInputRadio = event.target.parentElement.parentElement.parentElement.querySelectorAll('input[type="radio"]')
    for (let index = 0; index < listInputRadio.length; index++) {
      if(listInputRadio[index].value === event.target.value) {
        continue;
      }
      listInputRadio[index].dataset.waschecked = false
      // event.target.parentElement.parentElement.classList.remove('ant-radio-button-wrapper-checked')
      // event.target.parentElement.classList.remove('ant-radio-button-checked')
    }
  }

  const hanldeOnChange = (event: any) => {
    onChangeButton(event.target.value)
  }
  return <>
    <FormItem {...props} className={props.className}>
      <Radio.Group>
        {props.values.map((v) => <Radio.Button value={v} data-waschecked="false"  onClick={hanldeOnClick} onChange={hanldeOnChange} name="options">{v}%</Radio.Button>)}
      </Radio.Group>
    </FormItem>
  </>;
};

export default RadiButtonField;
