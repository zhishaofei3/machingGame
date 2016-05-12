class GameContainer extends egret.Sprite {
	/**游戏区域宽*/
	static thisW:number;
	/**游戏区域高*/
	static thisH:number;

	static boardWidth:number = 4;
	static boardHeight:number = 4;

	static cardHorizontalSpacing:number = 52;
	static cardVerticalSpacing:number = 52;

	static boardOffsetX:number = 145;
	static boardOffsetY:number = 70;

	private cardsLeft:number;

	private firstCard:Card;
	private secondCard:Card;

	private flipBackTimer:egret.Timer;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	/**初始化*/
	private onAddToStage(e:egret.Event):void {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		GameContainer.thisW = this.stage.stageWidth;
		GameContainer.thisH = this.stage.stageHeight;

		this.start();
	}

	private start():void {
		var fruitArr:any = ['苹果', '香蕉', '梨', '桔子', '榴莲', '草莓', '葡萄', '火龙果'];
		var cardlist:any = [];
		for (var i:number = 0; i < GameContainer.boardWidth * GameContainer.boardHeight / 2; i++) {
			cardlist.push(fruitArr[i]);
			cardlist.push(fruitArr[i]);
		}

		this.cardsLeft = 0;
		for (var x:number = 0; x < GameContainer.boardWidth; x++) {
			for (var y:number = 0; y < GameContainer.boardHeight; y++) {
				var card:Card = new Card();
				card.x = x * GameContainer.cardHorizontalSpacing + GameContainer.boardOffsetX;
				card.y = y * GameContainer.cardVerticalSpacing + GameContainer.boardOffsetY;
				var r:number = Math.floor(Math.random() * cardlist.length);
				card.setCardface(cardlist[r]);
				cardlist.splice(r, 1);
				card.touchEnabled = true;
				card.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickCard, this);
				this.addChild(card);
				this.cardsLeft++;
			}
		}

		this.firstCard = null;
		this.secondCard = null;
	}

	private clickCard(e:egret.TouchEvent):void {
		var card:Card = (e.target as Card);

		if (this.firstCard == null) {
			this.firstCard = card;
			card.showFront();
		} else if (this.firstCard == card) {
			this.firstCard.showBack();
			this.firstCard = null

		} else if (this.secondCard == null) {
			this.secondCard = card;
			card.showFront();

			if (this.firstCard.getCardface() == this.secondCard.getCardface()) {

				this.removeChild(this.firstCard);
				this.removeChild(this.secondCard);

				this.firstCard = null;
				this.secondCard = null;

				this.cardsLeft -= 2;
				if (this.cardsLeft == 0) {
					alert("你赢了");
				}
			} else {
				this.flipBackTimer = new egret.Timer(2000, 1);
				this.flipBackTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.returnCards, this);
				this.flipBackTimer.start();
			}
		} else {
			this.returnCards();
			this.firstCard = card;
			this.firstCard.showFront();
		}
	}

	private returnCards(e:egret.TimerEvent = null) {
		this.firstCard.showBack();
		this.secondCard.showBack();
		this.firstCard = null;
		this.secondCard = null;
		this.flipBackTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.returnCards, this);
	}

}