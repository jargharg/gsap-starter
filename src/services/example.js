/*
	Functions used in multiple places can live in this folder
	e.g. commerce/other API calls, data manipulation
*/

const example = {
	reverse: string => string.split('').reverse().join(''),
};

export default example;

/*
	The reverse function can now be used in components e.g. components/HelloWorld.vue
*/
