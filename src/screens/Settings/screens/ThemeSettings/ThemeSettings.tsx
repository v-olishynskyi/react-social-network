import React from 'react';
import { ThemeSettingsProps } from './types';
import './styles.scss';
import { SelectButton } from 'primereact/selectbutton';
import { useRecoilState } from 'recoil';
import uiAtom from '@store/ui';
import { LightIcon, MoonIcon } from '@assets/svg';

const ThemeSettings: React.FC<ThemeSettingsProps> = () => {
  const [ui, setUi] = useRecoilState(uiAtom);

  const justifyOptions = [
    { icon: <LightIcon />, value: 'light', label: 'Light' },
    { icon: <MoonIcon />, value: 'dark', label: 'Dark' },
  ];

  const justifyTemplate = (option: any) => {
    return (
      <div className='flex flex-row'>
        <div className='mr-1'>{option.icon}</div>
        {option.label}
      </div>
    );
  };

  return (
    <div className='theme-settings'>
      <SelectButton
        value={ui.theme}
        onChange={e => {
          setUi(prev => ({ ...prev, theme: e.value ?? ui.theme }));
        }}
        itemTemplate={justifyTemplate}
        optionLabel='value'
        options={justifyOptions}
      />
    </div>
  );
};

export default ThemeSettings;
