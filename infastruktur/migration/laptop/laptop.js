const config = require("../../../config");
const Postgres = require("../../../helper/database/postgres");

let db = null;

const createConnectDb = async () => {
    db = new Postgres({ connectionString: config.database.postgres.url });
};

const laptopMigration = async () => {
    try {
        if (db) {
            result = await db.query(`CREATE TABLE IF NOT EXISTS laptop(
            id BIGSERIAL NOT NULL UNIQUE,
            merk_id INT NOT NULL,
            laptop VARCHAR(50) NOT NULL, 
            processor_id INT NOT NULL,
            ram_id INT NOT NULL,
            penyimpanan_id INT NOT NULL,
            vga_id INT NOT NULL,
            display_id INT NOT NULL,
            harga BIGINT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            deleted_at TIMESTAMP NULL,
            CONSTRAINT FK_merk FOREIGN KEY(merk_id) REFERENCES merk(id) ON DELETE CASCADE,
            CONSTRAINT FK_processor FOREIGN KEY(processor_id) REFERENCES processor(id) ON DELETE CASCADE,
            CONSTRAINT FK_ram FOREIGN KEY(ram_id) REFERENCES ram(id) ON DELETE CASCADE,
            CONSTRAINT FK_penyimpanan FOREIGN KEY(penyimpanan_id) REFERENCES penyimpanan(id) ON DELETE CASCADE,
            CONSTRAINT FK_vga FOREIGN KEY(vga_id) REFERENCES vga(id) ON DELETE CASCADE,
            CONSTRAINT FK_display FOREIGN KEY(display_id) REFERENCES display(id) ON DELETE CASCADE
            )`)
            if (result.err) throw result.err;
        }
    } catch (err) {
        console.log(err)
    }
}

const init = async () => {
    await createConnectDb()
    await laptopMigration()
}

module.exports = init