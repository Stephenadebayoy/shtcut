import useGeneralState from '@shtcut/hooks/general-state';
import useQrCodeState from '@shtcut/hooks/qrcode/index.';
import { EyeRadiusType } from '@shtcut/types/types';
import React from 'react';
import { QRCode } from 'react-qrcode-logo';

const Frame_4 = () => {
    const { presetColorString, tabParams, borderColor, urlScan } = useGeneralState();
    const { state } = useQrCodeState();

    return (
        <div className="flex flex-col justify-center items-center flex-1 h-full relative w-full">
            <div className="relative bottom-20 ">
                <p className={`text-sm uppercase`}>{state?.title ? String(state?.title) : 'SCAN ME'}</p>
            </div>
            <div className="flex justify-center items-center   relative ">
                {/* Top Left */}
                <div className="absolute top-0 left-0 w-16 h-16" style={{ backgroundColor: 'transparent' }}>
                    <div
                        className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 "
                        style={{ borderColor: borderColor }}
                    ></div>
                </div>
                {/* Top Right */}
                <div style={{ backgroundColor: 'transparent' }} className="absolute top-0 right-0 w-16 h-16">
                    <div
                        className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 "
                        style={{ borderColor: borderColor }}
                    ></div>
                </div>
                {/* Bottom Left */}
                <div style={{ backgroundColor: 'transparent' }} className="absolute bottom-0 left-0 w-16 h-16">
                    <div
                        className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 "
                        style={{ borderColor: borderColor }}
                    ></div>
                </div>
                {/* Bottom Right */}
                <div style={{ backgroundColor: 'transparent' }} className="absolute bottom-0 right-0 w-16 h-16">
                    <div
                        className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 "
                        style={{ borderColor: borderColor }}
                    ></div>
                </div>
                {/* Center Text */}
                <div className="absolute ">
                    <QRCode
                        id="shtcut-qrcode"
                        value={urlScan as string}
                        removeQrCodeBehindLogo={true}
                        ecLevel="L"
                        fgColor={tabParams !== 'website' ? state?.presetColor : presetColorString}
                        size={90}
                        logoWidth={30}
                        logoHeight={30}
                        eyeRadius={state?.eyeRadius as EyeRadiusType}
                        logoImage={String(state?.logo)}
                        qrStyle={state?.qrStyle as 'squares' | 'dots' | 'fluid'}
                    />
                </div>
            </div>
        </div>
    );
};

export default Frame_4;
