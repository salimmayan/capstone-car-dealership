import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


function LikeButton(props) {
    return (
        <div style={{
            margin: 'auto',
            display: 'block',
            width: 'fit-content'
        }}>
            {/* <h3>How to use HeartCheckBox in ReactJS?</h3> */}
            <FormControlLabel
                control={<Checkbox icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    name="checkedH" />}
                label=""
            />
        </div>
    );
}

export default LikeButton;
