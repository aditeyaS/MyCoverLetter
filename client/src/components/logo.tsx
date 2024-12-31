import { cn } from "@/lib/utils";

interface Props {
  className: string;
}

export function Logo({ className }: Props) {
  return (
    <svg
      className={cn("w-fit", className)}
      viewBox="0 0 90 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M38.7 1.42708C40.6673 0.487594 42.8199 0 45 0C47.1801 0 49.3327 0.487594 51.3 1.42708C53.0297 2.25683 54.6146 3.60902 56.8316 5.5012L57.1785 5.79095C59.2858 7.59094 61.3009 8.44265 64.115 8.66655L64.5628 8.70167C67.4691 8.93435 69.5457 9.09679 71.3545 9.73776C73.4102 10.464 75.2775 11.6409 76.8195 13.1822C78.3616 14.7235 79.5394 16.5901 80.2666 18.6455C80.9032 20.4543 81.0656 22.5309 81.2983 25.4372L81.3334 25.885C81.5573 28.6991 82.4134 30.7142 84.209 32.8215L84.4988 33.164C86.391 35.3854 87.7476 36.9703 88.5729 38.7C89.5124 40.6673 90 42.8199 90 45C90 47.1801 89.5124 49.3327 88.5729 51.3C87.7432 53.0297 86.391 54.6146 84.4988 56.8316L84.209 57.1785C82.3739 59.3297 81.553 61.3536 81.3334 64.115L81.2983 64.5628C81.0656 67.4691 80.9032 69.5457 80.2622 71.3545C79.536 73.4102 78.3591 75.2775 76.8178 76.8195C75.2765 78.3616 73.4099 79.5394 71.3545 80.2666C69.5457 80.9032 67.4691 81.0656 64.5628 81.2983L64.115 81.3334C61.3009 81.5573 59.2858 82.4134 57.1785 84.209L56.8316 84.4988C54.6146 86.391 53.0297 87.7476 51.3 88.5729C49.3327 89.5124 47.1801 90 45 90C42.8199 90 40.6673 89.5124 38.7 88.5729C36.9703 87.7432 35.3854 86.391 33.1684 84.4988L32.8215 84.209C30.9074 82.4836 28.4585 81.4684 25.885 81.3334L25.4372 81.2983C22.5309 81.0656 20.4543 80.9032 18.6455 80.2622C16.5898 79.536 14.7225 78.3591 13.1805 76.8178C11.6384 75.2765 10.4607 73.4099 9.73337 71.3545C9.09679 69.5457 8.93435 67.4691 8.70167 64.5628L8.66655 64.115C8.53161 61.5415 7.51639 59.0926 5.79095 57.1785L5.5012 56.8316C3.60902 54.6146 2.25244 53.0297 1.42708 51.3C0.487594 49.3327 0 47.1801 0 45C0 42.8199 0.487594 40.6673 1.42708 38.7C2.25683 36.9703 3.60902 35.3854 5.5012 33.1684L5.79095 32.8215C7.51639 30.9074 8.53161 28.4585 8.66655 25.885L8.70167 25.4372C8.93435 22.5309 9.09679 20.4543 9.73776 18.6455C10.464 16.5898 11.6409 14.7225 13.1822 13.1805C14.7235 11.6384 16.5901 10.4607 18.6455 9.73337C20.4543 9.09679 22.5309 8.93435 25.4372 8.70167L25.885 8.66655C28.4585 8.53161 30.9074 7.51639 32.8215 5.79095L33.164 5.5012C35.3854 3.60902 36.9703 2.25244 38.7 1.42708ZM34.4635 25.4635C34.0488 24.9107 33.4707 24.5023 32.8111 24.2962C32.1515 24.0902 31.4437 24.0969 30.7881 24.3154C30.1325 24.534 29.5623 24.9532 29.1582 25.5139C28.7541 26.0745 28.5367 26.748 28.5367 27.4391V62.5609C28.5367 63.4341 28.8836 64.2716 29.5011 64.8891C30.1186 65.5066 30.9561 65.8535 31.8293 65.8535C32.7026 65.8535 33.5401 65.5066 34.1576 64.8891C34.7751 64.2716 35.122 63.4341 35.122 62.5609V37.3171L42.3659 46.9756C42.6726 47.3845 43.0703 47.7164 43.5275 47.945C43.9847 48.1736 44.4888 48.2927 45 48.2927C45.5112 48.2927 46.0153 48.1736 46.4725 47.945C46.9297 47.7164 47.3274 47.3845 47.6341 46.9756L54.878 37.3171V62.5609C54.878 63.4341 55.2249 64.2716 55.8424 64.8891C56.4599 65.5066 57.2974 65.8535 58.1707 65.8535C59.0439 65.8535 59.8814 65.5066 60.4989 64.8891C61.1164 64.2716 61.4633 63.4341 61.4633 62.5609V27.4391C61.4633 26.748 61.2459 26.0745 60.8418 25.5139C60.4377 24.9532 59.8675 24.534 59.2119 24.3154C58.5563 24.0969 57.8485 24.0902 57.1889 24.2962C56.5292 24.5023 55.9512 24.9107 55.5365 25.4635L45 39.5122L34.4635 25.4635Z"
        className="fill-primary"
      />
    </svg>
  );
}