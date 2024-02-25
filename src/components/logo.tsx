import IconO from "../assets/icons/o.svg";
import IconX from "../assets/icons/x.svg";

interface Props {
    width: number;
    height: number;
}

function Logo({ width, height }: Props) {
    return (
        <article className="flex gap-2">
            <img src={IconX} alt="icon-o" className={`w-${width} h-${height}`} />
            <img src={IconO} alt="icon-x" className={`w-${width} h-${height}`} />
        </article>
    );
}

export default Logo;