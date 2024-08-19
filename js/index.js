// The spaghetti code masterpiece
var game = {
	canvas: document.getElementById('canvas'),
	context: this.canvas.getContext('2d', {alpha: false}),
	counter: document.getElementById('counter'),
	textures: new Image(),
	drawPending: false,
	backgrounds: {
			'sky': {
				image: new Image(),
				loaded: false
			},
			'trees': {
				image: new Image(),
				loaded: false
			},
			'buildings': {
				image : new Image(),
				loaded: false
			}
	},
	sounds: {
		jump: new Audio('sounds/jump.wav')
	},
	characterVisual: {
		texturesPath: "human.png",
		tileWidth: 64, 
		tileHeight: 64,
		canvasWidth: window.innerWidth / 3,
		canvasHeight: window.innerHeight / 3
	},
	fireball: {
		texturesPath: "FireBall.png",
		tileWidth: 64,
		tileHeight: 64,
		canvasWidth: window.innerWidth / 3.5,
		canvasHeight: window.innerHeight / 3.5
	},
	options: {
		texturesPath: "textures.png",
		tileWidth: 24,
		tileHeight: 24,
		canvasWidth: window.innerWidth / 3,
		canvasHeight: window.innerHeight / 3
	},
	pressedKeys: {},
	init: function (onInit) {
		this.canvas.width = this.options.canvasWidth
		this.canvas.height = this.options.canvasHeight
		this.context.imageSmoothingEnabled = false

    this.backgrounds['sky'].image.src = "background_mountains.png"
		this.backgrounds['buildings'].image.src = "buildings-layer.png"

		for (var key in this.backgrounds) {
			this.backgrounds[key].image.onload = function (currentKey) {
				this.backgrounds[currentKey].loaded = true
			}.bind(this, key)
		}

		this.textures.src = this.options.texturesPath
		this.textures.onload = onInit
		this.characterVisual.textures = new Image()
		this.characterVisual.textures.src = this.characterVisual.texturesPath
		this.fireball.textures = new Image()
		this.fireball.textures.src = this.fireball.texturesPath
	},
	map: {
		structures: [],
		fireballsList: [],
	},
	isOver: false
}
