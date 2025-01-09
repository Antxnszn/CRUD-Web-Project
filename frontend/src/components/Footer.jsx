import GitHubprofile from "../icons/GitHubprofile";



export default function Footer() {

  return (
    <>
      <footer id="contact" className='bg-[#49A4CA] mb-14 py-10'>
        <h4 id="section3" className="text-[2.5rem] text-[#CBDEE7] font-light text-center mt-[1em]">
          Contact Me
        </h4>
        <div className="flex mt-10 gap-6 items-center justify-center">
          <div>
            <a href="https://antonioestrada-portfolio.vercel.app/" className='text-center text-[1.7rem] text-[#CBDEE7]'>
                My portfolio &
            </a>
          </div>
          <div>
            <GitHubprofile />
          </div>
        </div>
      </footer>
    </>
  );
}
