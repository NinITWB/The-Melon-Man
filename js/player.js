game.player = {
		x: 54,
		y: 0,
		height: 64,
		highestY: 0,
		direction: "left",
		isInAir: false,
		lastDirection: "right",
		jumpCount: 0,
		startedJump: false,
		moveInterval: null,
		fallTimeout: function(startingY, time, maxHeight) {
			setTimeout( function () {
				if (this.isInAir) {
					this.y = startingY - maxHeight + Math.pow((-time / 3 + 11), 2)
					if (this.y < this.highestY) {
						this.highestY = this.y
					}
					if (time > 37 ) {
						this.startedJump = false
						game.checkCollisions()
					}
					if (game.keyBoard.isPressSpace && this.jumpCount == 2)
					{
						// console.log('reset')
						clearInterval(this.fallInterval)
						time = 1
						startingY = this.y
						this.jumpCount++
						maxHeight = 121
						this.fallTimeout(startingY, time, maxHeight)
						return					
					}
					if (time < 150) {
						time++
						this.fallTimeout(startingY, time, maxHeight)
					} else {
						game.isOver = true
					}
					if (this.y > 40) {
						game.isOver = true
					}
					game.requestRedraw()
				}
			}.bind(this, startingY, time, maxHeight), 12)
		},
		animationFrameNumber: 0,
		collidesWithGround: true,
		animations: {
			// Describe coordinates of consecutive animation frames of objects in textures
			left: [{tileColumn: 0, tileRow: 0}, {tileColumn: 0, tileRow: 0}, {tileColumn: 0, tileRow: 0}, {tileColumn: 0, tileRow: 0}],
			right: [{tileColumn: 0, tileRow: 0}, {tileColumn: 0, tileRow: 0}, {tileColumn: 0, tileRow: 0}, {tileColumn: 0, tileRow: 0}]
		},
		jump: function (type) {
			if (this.jumpCount < 2) {
				clearInterval(this.fallInterval)
				this.jumpCount++
				game.sounds.jump.play()
				this.isInAir = true
				this.startedJump = true
				var startingY = this.y
				var time = 1
				maxHeight = 121
				this.fallTimeout(startingY, time, maxHeight)
			}
		},
		fallingJump: function() {
			if (!this.isInAir)
			{
				clearInterval(this.fallInterval)
				game.sounds.jump.play()
				this.isInAir = true
				this.startedJump = true
				var startingY = this.y
				time = 30
				maxHeight = 0
				this.fallTimeout(startingY, time, maxHeight)
			}
			
		}
	}
