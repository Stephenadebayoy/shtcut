import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Dict, toast } from '@shtcut-ui/react';
import { timeAgo } from '@shtcut/_shared';
import { GripVertical, Copy, BarChart } from 'lucide-react';
import Link from 'next/link';
import { PopoverMenu } from '../Popover';
import { QRCode } from 'react-qrcode-logo';
import useCopyToClipboard from '@shtcut/hooks/useCopyToClipboard';

interface QRCodeProp {
    id: string;
    alias: string;
    target: string;
    title?: string;
    domain: {
        slug: string;
    };
    createdAt?: string;
    archived?: boolean;
    clicks?: number;
    qrCode?: string | Dict;
    tags?: {
        title: string;
        color?: string;
    }[];
    onSearch?: (search: string) => void;
}
export const QRCodeCard = (props: QRCodeProp) => {
    const {
        id,
        alias,
        title,
        target,
        domain: { slug }
    } = props;
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const { handleCopy } = useCopyToClipboard();
    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };
    return (
        <>
            <div
                ref={setNodeRef}
                style={style}
                className=" flex bg-white items-center p-2 rounded-lg drop-shadow-md my-5"
            >
                <div
                    className=" text-gray-400 text-sm hover:bg-blue-100 rounded-sm p-[3px]"
                    {...attributes}
                    {...listeners}
                >
                    <GripVertical color="grey" size={17} />
                </div>
                <QRCode
                    id="shtcut-qrcode"
                    value={''}
                    removeQrCodeBehindLogo={true}
                    ecLevel="L"
                    fgColor={'#000000'}
                    size={50}
                    style={{
                        aspectRatio: '192/192',
                        objectFit: 'cover',
                        width: 20,
                        height: 20
                    }}
                />
                <div className="flex-1 p-2 h-full relative">
                    <div className="flex">
                        <div className="w-full pr-3">
                            <div className="grid mb-1 w-full grid-cols-[minmax(0,_90%)] items-baseline">
                                <div className=" w-full row-start-1 col-start-1 items-center">
                                    <div className="flex items-center max-w-full rounded-[2px] outline-offset-2 outline-2 gap-2 lg:gap-4">
                                        <p className="truncate w-fit max-w-[80px] text-gray-500 text-sm whitespace-nowrap overflow-hidden font-semibold lg:w-fit lg:max-w-[150px]">
                                            <a
                                                href={`https://${slug}/${alias}`}
                                                target="_blank"
                                                className="text-blue-600"
                                                rel="noreferrer"
                                            >
                                                {`${slug}/${alias}`}
                                            </a>
                                        </p>

                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-wrap gap-2">
                                                <Link
                                                    onClick={() => handleCopy(`${slug}/${alias}`)}
                                                    href="#"
                                                    className="group rounded-full bg-gray-100 p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 active:scale-95"
                                                >
                                                    <Copy color="grey" size={15} />
                                                </Link>

                                                <Link
                                                    href="/"
                                                    className="flex items-center space-x-1 rounded-md bg-gray-100 px-2 py-0.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 active:scale-100"
                                                >
                                                    <BarChart color="grey" size={15} />
                                                    <p className="whitespace-nowrap text-sm text-gray-500">
                                                        {props.clicks}
                                                        <span className="ml-1 hidden sm:inline-block">clicks</span>
                                                    </p>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="">
                                    <div className="row-start-1 col-start-1 inline-flex">
                                        <a
                                            target="_blank"
                                            href={`https://${slug}/${alias}`}
                                            className="flex items-center max-w-full rounded-[2px] outline-offset-2 outline-2"
                                            rel="noreferrer"
                                        >
                                            <p className="text-gray-500 w-[200px] text-sm lg:w-[320px] whitespace-nowrap overflow-hidden font-semibold text-ellipsis">
                                                <span>{title}: </span>
                                                <span className="ml-1 text-black">{target}</span>
                                            </p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="flex justify-center items-center ">
                            <div className="flex items-center">
                                <small className="mr-8 hidden whitespace-nowrap text-sm text-gray-500 sm:block">
                                    Added {timeAgo(props.createdAt)}
                                </small>
                                <PopoverMenu {...props} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
