import React from "react";
import "./faq.css";

function Faq() {
    return (
        <div className="faq">
            <div className="faq-holder">
                <h1>Frequently Asked Questions</h1>
                <div>
                    <p>1. Is the product safe to use?</p>
                    <span>
                        Yes, the product is generally safe to use as it is non
                        invasive and do not emit radiation.
                    </span>
                    <p>2. How accurate are the obtained results?</p>
                    <span>
                        Accuracy can vary between different EEG headsets. Real
                        world accuracy may also depend on individual's
                        variations in brain wave patterns.
                    </span>
                    <p>3. Is the product suitable for everyday use?</p>
                    <span>
                        These headsets are designed for monitoring emotions and
                        can be used everyday for monitoring and supervising
                        autism spectrum.
                    </span>
                    <p>4. How to properly maintain the product?</p>
                    <span>
                        Clean the sensors with a mild solution. Also avoid
                        submerging the device in water and store it in a cool
                        and dry place when not in use.
                    </span>
                    <p>5. Can EEG headset read my thoughts?</p>
                    <span>
                        No, EEG headsets cannot read thoughts. They measure
                        electrical activity on the scalp thus providing
                        information about the brain wave patterns associated
                        with different mental states.
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Faq;
