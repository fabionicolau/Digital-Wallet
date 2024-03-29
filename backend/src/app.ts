import * as express from 'express';
import * as cors from 'cors';
import userRoutes from './routes/userRoutes';
import accountRoutes from './routes/accountRoutes';
import transactionsRoutes from './routes/transactionsRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.router();
    
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }
  
  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };
    
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(accessControl);
  }
  
  private router():void {
    this.app.use(userRoutes);
    this.app.use(accountRoutes);
    this.app.use(transactionsRoutes);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
