import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/loading-animation.json'

const Spinner = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    }
    return (
        <div className='flex flex-col items-center justify-center mt-40'>
            {/* <span className="loading loading-spinner text-warning"></span> */}
            <Lottie options={defaultOptions}
              height={400}
              width={400}
            //   isStopped={this.state.isStopped}
            //   isPaused={this.state.isPaused}
              />
        </div>
    );
};

export default Spinner;