interface CheckIconProps {
  color?: string
  height?: string
  width?: string
}

const CheckIcon = ({
  color = '#fff',
  height = '24',
  width = '24',
}: CheckIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10.5858 13.4142L7.75735 10.5858L6.34314 12L10.5858 16.2427L17.6568 9.1716L16.2426 7.75739L10.5858 13.4142Z'
        fill={color}
      />
    </svg>
  )
}

export default CheckIcon
