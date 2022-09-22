import * as React from 'react'
import { motion, useCycle } from 'framer-motion'
import Link from 'next/link';
import { useRouter } from "next/router";
import UtmParams from "../UTM/UtmParams"
// import { NoEncryption } from '@mui/icons-material';
// interface MenuItemProps {
//   i: number,
//   MenuLink?: Array<string>,
// }

const variants = {
  open: {
    y: 20,
    opacity: 1,
    display: "block",
    zIndex: 999,
    transition: {
      y: { stiffness: 1000, velocity: -1000 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    zIndex: -1,
    display: "none",
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

//const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF', '#4400FF']
const colors = ['#73b564', '#73b564', '#73b564', '#73b564', '#73b564']

export const MenuItem = ({ i, MenuLink }) => {

let { asPath } = useRouter();
let params = UtmParams(asPath)
const navLink = [
  {title:"Problems We Solve", url: `/problems-we-solve/${params}`}, 
  {title:"Products We Offer", url: `/products-we-offer/${params}`}, 
  {title:"Partner", url: `/partner/${params}`}, 
  {title:" Blog", url: `/blog/${params}`}
]

// const navLink = [{title:"Problems We Solve", url: `#`}, {title:"Products We Offer", url: `#`}, {title:"Partner", url: `#`}, {title:" blog", url: `#`}]
  
  const style = { border: `1px solid ${colors[i]}` }
  const [isOpen, toggleOpen] = useCycle(false, true);
  
  return (
    <motion.div
      variants={variants}
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.95 }}
    > 
      {/* {typeof links != 'string' && ( */}
        
        
        <div className='text-placeholder' style={style}>
          {navLink.map((item, index) =>
            <li key={index}>
              <Link href={item?.url} passHref>
                <a className="button">{item?.title}</a>
              </Link>
            </li>
          )}
        
        
        {/* {MenuLink?.map((value, key)=> (
          <div key={key}>
            {i === key ? (
              // <div> Label</div>
              <>
                <Link href={value.url ?? ''} >
                  <a href={value.url}>{value?.label}</a>
                </Link>
              </>
              ) : ( <div></div> )
            }
          </div>
        ))} */}
        </div>
      {/* )} */}
      {/* <div className='text-placeholder' style={style} /> */}
      <div className='icon-placeholder' style={style} />
    </motion.div>
  )
}
