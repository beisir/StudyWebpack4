import _ from 'lodash';
import './assets/style/index.css';
import './assets/style/index.scss';
import axios from 'axios'
// import $ from 'jquery';

console.log($('body'));


function createEle () {
    var element = document.createElement('div');
        element.innerHTML = _.join(['hh', 'll' ,'oo'], '');
    return element;
};

document.body.appendChild(createEle());


axios.get('/api/200').then(response => console.log(response));

console.log('000000aaaa------2222zzzzsadasdsssssss');

class Hello {
    show () {
        console.log(this.Age);
    }


    get Age () {
        return this._age;
    }

    set Age (val) {
        this._age = val + '666666';
    }
}
const hobj = new Hello();
hobj.Age = '何贝';
hobj.show();


let [a,b,c] = [123,'asd', 'xxxx'];

console.log(a, b ,c);
