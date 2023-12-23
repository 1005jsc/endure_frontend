import {useEffect} from 'react';

const KeyDetector = ({sendKeyValue}: any) => {
  const keyPress = (e: any) => {
    sendKeyValue(e.key);
  };

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  });

  return <></>;
};
export default KeyDetector;
