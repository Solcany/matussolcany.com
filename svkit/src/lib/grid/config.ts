// Number of cell rows; columns follow from the canvas aspect ratio.
export const ROWS = 5;
// How far the grid extends past the canvas edges, in cells.
export const BLEED = 0.22;
// Number of spiral squares drawn inside each diamond.
export const NESTED_SQUARES = 4;
// How far a trigger's force reaches, in cells.
export const REACH = 3;
// How far lattice points are pushed away from a trigger, in cells.
export const PUSH = 0.5;

// Diamond size relative to its cell.
export const RADIUS_RATIO = 0.25;
// Maximum spiral twist of a pulled cell (0 is flat, 0.5 is fully wound).
export const MAX_TWIST = 0.4;
// Maximum rotation of a pulled cell.
export const MAX_ANGLE = Math.PI / 2.2;
// Rotation a triggered cell turns to.
export const TRIGGERED_ANGLE = Math.PI / 2.05;
// Fill opacity of a resting cell.
export const BASE_ALPHA = 150 / 255;

// How sharply a trigger's force drops off with distance.
export const FALLOFF_CURVE = 2;
// How quickly rotation builds up as a cell gets closer to a trigger.
export const ANGLE_CURVE = 4;
// How quickly the spiral twist builds up as a cell gets closer to a trigger.
export const TWIST_CURVE = 1.5;
// How quickly a pulled cell fades as it moves away from home.
export const FADE_CURVE = 4;

// How far neighbours move toward a trigger, as a fraction of the distance.
export const PULL = 0.6;
// Spring strength pulling cells to their target position.
export const STIFFNESS = 0.04;
// How much cell movement is slowed each frame (lower stops faster).
export const DAMPING = 0.75;
// How slowly cells rotate toward their target angle (higher is slower).
export const ANGLE_EASING = 0.9;

// Seconds a trigger takes to reach full strength.
export const SWELL = 1.2;
// Seconds a trigger stays at full strength.
export const HOLD = 2.3;
// Seconds a trigger takes to fade back out.
export const RELEASE = 2.1;
// Extra spiral twist that builds up during the hold.
export const HOLD_TWIST = 0.15;
// Extra rotation that builds up during the hold.
export const HOLD_TURN = Math.PI / 5;
// Seconds a trigger takes to snap back once its lines cross its own square.
export const SNAP = 0.425;
// Maximum number of triggers active at once.
export const MAX_ACTIVE = 3;
// How much more likely pulled cells are to be triggered next.
export const PULLED_BIAS = 3;
// Range of seconds between new triggers.
export const TRIGGER_INTERVAL = { min: 1.0, max: 3.2 };

// Cell speed below which a cell counts as resting.
export const SETTLED_VELOCITY = 0.01;
// Angle difference below which a cell counts as done rotating.
export const SETTLED_ANGLE = 0.001;

// Thickness of the lines connecting neighbouring diamonds.
export const LATTICE_WIDTH = 0.4;
// Thickness of the diamond and spiral outlines.
export const OUTLINE_WIDTH = 0.4;
// Fill opacity below which a cell's fill is skipped.
export const VISIBLE_ALPHA = 0.005;

// Frame rate the motion constants were tuned for; leave at 60.
export const SIMULATION_FPS = 60;
// Maximum frames drawn per second.
export const FPS = 60;
// Milliseconds between drawn frames, derived from FPS.
export const FRAME_INTERVAL = 1000 / FPS;
// Milliseconds of slack so frames line up with the display refresh.
export const FRAME_TOLERANCE = 2;
// Longest time step simulated at once, so pauses don't cause jumps.
export const MAX_DELTA = 1 / 20;
// Seconds the grid waits after loading before the first trigger.
export const START_DELAY = 2;
// Overall animation speed (1 is normal).
export const SPEED = 0.8;
// Canvas resolution multiplier, for smoother lines.
export const PIXEL_RATIO = 2;
// Milliseconds to wait after resizing stops before rebuilding the grid.
export const RESIZE_DEBOUNCE = 150;
