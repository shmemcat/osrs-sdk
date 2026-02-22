import { Necklace } from "../../sdk/gear/Necklace";
import { ImageLoader } from "../../sdk/utils/ImageLoader";
import { Assets } from "../../sdk/utils/Assets";
import InventImage from "../../assets/images/equipment/Amulet_of_glory.png";
import { ItemName } from "../../sdk/ItemName";

export class AmuletOfGlory extends Necklace {
  inventorySprite: HTMLImageElement = ImageLoader.createImage(this.inventoryImage);

  get inventoryImage() {
    return InventImage;
  }
  get itemName(): ItemName {
    return ItemName.AMULET_OF_GLORY;
  }
  get weight(): number {
    return 0.008;
  }

  Model = Assets.getAssetUrl("models/player_amulet_of_torture__or_.glb");
  override get model() {
    return this.Model;
  }

  constructor() {
    super();
    this.bonuses = {
      attack: {
        stab: 10,
        slash: 10,
        crush: 10,
        magic: 10,
        range: 10,
      },
      defence: {
        stab: 3,
        slash: 3,
        crush: 3,
        magic: 3,
        range: 3,
      },
      other: {
        meleeStrength: 6,
        rangedStrength: 0,
        magicDamage: 0,
        prayer: 3,
      },
      targetSpecific: {
        undead: 0,
        slayer: 0,
      },
    };
  }
}
