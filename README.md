# sticky-popup
Makes the Halo PSA "similar incidents" popup moveable and remember its last location when opening a new ticket.(Cript ran in Tampermonkey browser ext.)

Currently, the popup window UI does not allow for the popup to be moved and have it remember its last location. I wrote a script so that it does not reset to the original position but instead sticks where I leave it so and I wont be moving it after opening every new ticket. 

This is the current UI code: <div class="problemmatching top-right -buttons-5 react-draggable react-draggable-dragged" style="touch-action: none; transform: translate(1px, -26px);">
its set to draggable but reverts to programmed position each time a ticket is closed and opened. 
