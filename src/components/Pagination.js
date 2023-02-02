import React from 'react'

const Pagination = ({ page, count, perPage, paginationClick }) => {
    const totalLinks = Math.ceil(count / perPage);
    let startLoop = page;
    let diff = totalLinks - page;
    if (diff <= 3) {
      startLoop = totalLinks - 3;
    }
    let endLoop = startLoop + 3;
    if (startLoop <= 0) {
      startLoop = 1;
    }
    const links = () => {
        const allLinks = [];
        for (let i = startLoop; i <= endLoop; i++) {
          allLinks.push(
            <a key={i} onClick={()=>paginationClick(i)} className={page==i?`active`:``}>
             
                {i}
              
            </a>
          );
        }
        return allLinks;
      };
   
  return (
    <div className='Filterpagination' >
        {
            count > perPage && (
                 <>
                  {/* {prev()} */}
                  {links()}
                  {/* {next()} */}
                  </>
              )
        }
    </div> 
  )
}

export default Pagination
