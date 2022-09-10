// import '@testing-library/jest-dom';
import Enzyme, { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { TextEncoder, TextDecoder } from 'util';


global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

configure({ adapter: new Adapter() });
export default Enzyme;