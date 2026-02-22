import { ImageLoader } from "../../sdk/utils/ImageLoader";
import { Assets } from "../../sdk/utils/Assets";
import InventImage from "../../assets/images/equipment/Saradomin_chaps.png";
import { Legs } from "../../sdk/gear/Legs";
import { ItemName } from "../../sdk/ItemName";

export class SaradominChaps extends Legs {
  inventorySprite: HTMLImageElement = ImageLoader.createImage(this.inventoryImage);

  get inventoryImage() {
    return InventImage;
  }
  get itemName(): ItemName {
    return ItemName.SARADOMIN_D_HIDE_CHAPS;
  }

  get weight(): number {
    return 5;
  }

  Model = Assets.getAssetUrl("models/player_ancestral_robe_bottom.glb");
  override get model() {
    return this.Model;
  }

  constructor() {
    super();
    this.bonuses = {
      attack: {
        stab: 0,
        slash: 0,
        crush: 0,
        magic: -10,
        range: 17,
      },
      defence: {
        stab: 31,
        slash: 25,
        crush: 33,
        magic: 28,
        range: 31,
      },
      other: {
        meleeStrength: 0,
        rangedStrength: 0,
        magicDamage: 0,
        prayer: 1,
      },
      targetSpecific: {
        undead: 0,
        slayer: 0,
      },
    };
  }
}
