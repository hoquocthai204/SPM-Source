import { saveAs } from 'file-saver';
export const downloadQRCode = (event: any, createdDate?: string, amount?: string | number) => {
  const aEle = <HTMLAnchorElement>document.createElement('a');
  aEle.href = event.target.href;
  aEle.download = `${amount}_THB_Bank_of_Ayudhya_${createdDate}.png`; //File name Here
  aEle.click(); //Downloaded file
};
