class Card extends egret.Sprite {

	private backSprite:egret.Sprite;
	private frontSprite:egret.Sprite;
	private tf:egret.TextField = new egret.TextField();
	private cardface:string;

	private flipStep:number;
	private flipToFrame:string;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(e:egret.Event):void {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

		this.anchorOffsetX = 25;

		this.backSprite = new egret.Sprite();
		this.backSprite.graphics.clear();
		this.backSprite.graphics.beginFill(0x000000);
		this.backSprite.graphics.drawRect(0, 0, 50, 50)
		this.backSprite.graphics.endFill();
		this.addChild(this.backSprite);
	}

	public setCardface(s:string):void {
		this.frontSprite = new egret.Sprite();
		this.frontSprite.graphics.beginFill(0x0000ff);
		this.frontSprite.graphics.drawRect(0, 0, 50, 50)
		this.frontSprite.graphics.endFill();
		this.tf.width = 50;
		this.tf.textAlign = egret.HorizontalAlign.CENTER;
		this.tf.size = 14;
		this.tf.x = 0;
		this.tf.y = 20;
		this.tf.textColor = 0xffffff;
		this.tf.text = s;
		this.cardface = s;
		this.frontSprite.addChild(this.tf);
		this.frontSprite.visible = false;
		this.addChildAt(this.frontSprite, 0);
	}

	public getCardface():string {
		return this.cardface;
	}

	public showBack():void {
		this.flipStep = 10;
		this.flipToFrame = "back";
		this.addEventListener(egret.Event.ENTER_FRAME, this.gameLoop, this);
	}

	public showFront():void {
		this.flipStep = 10;
		this.flipToFrame = "front";
		this.addEventListener(egret.Event.ENTER_FRAME, this.gameLoop, this);
	}

	private gameLoop(e:egret.Event):void {
		this.flipStep--;

		if (this.flipStep > 5) {
			this.scaleX = .20 * (this.flipStep - 6);
		} else {
			this.scaleX = .20 * (5 - this.flipStep);
		}

		if (this.flipStep == 5) {
			if (this.flipToFrame == "back") {
				this.backSprite.visible = true;
				this.frontSprite.visible = false;
			} else if (this.flipToFrame == "front") {
				this.backSprite.visible = false;
				this.frontSprite.visible = true;
			}
		}

		if (this.flipStep == 0) {
			this.removeEventListener(egret.Event.ENTER_FRAME, this.gameLoop, this);
		}
	}
}