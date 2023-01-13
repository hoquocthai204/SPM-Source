import React from 'react';

interface CopyIconProps {}

const CopyIcon: React.FunctionComponent<CopyIconProps> = (props) => {
  return (
    <span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ verticalAlign: 'middle' }}
      >
        <rect width="20" height="20" fill="url(#pattern0)" />
        <defs>
          <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlinkHref="#image0_926_9084" transform="scale(0.0078125)" />
          </pattern>
          <image
            id="image0_926_9084"
            width="128"
            height="128"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAGkAAABpAB4R/DdQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANuSURBVHic7duxb1VlGMfx33POpQQTSJyUQCkQEplIlV4MiSRsxMmJlUmNMdFNY2gbm5Qy8AewMehgcHRy7UKAtoRBw2JCKSUsigSJmlDueRwYNEbbhr7nfe/p8/2Mbe57fu39pvekvZUAAAAAAAAAAAAAAAAAAAAAAB1mpQds1ZuTd8d6Vp2T2/7SW9pklf8yUH311uzoD0nPTXlYbi+e/Pq2pFdLb8nkmZmfXpg9eD3VgVWqg0roWXVOcZ58SRpp3D5KeWCnA5Cq10ovyM1ce1Oe1/EAsFW90gNSM/lNl82X3pGE2zGZv9vmJbZdAC6bX7ww9kXpHSmcmL73vru1GgAvAcERQHAEEBwBBEcAwRFAcAQQHAEERwDBEUBwBBAcAQRHAMERQHBZ/xzcP788rqq6LGlC0o5NPOSBSVcWLozNtLssrmw/Ac6e9VpV/Z2kk9rcky9J+136cmLy/nstTgstWwDLbywfkfzAyzzWzE+m3oMXsgVgje166cea7qTcgr8N+1vCGsmuvlKPflN6yHZVOoAn6umt//vkyB9//nzt0tGnOQdFUzqAZnFm7G7hDaHxe4DgCCA4AgiOAIIjgOAIIDgCCI4AgiOA4AggOAIIjgCCI4DgCCA4AgiOAIIjgOAIIDgCCI4AgiOA4AggOAIIjgCCI4DgCCA4AgiOAIIr/c+h6bnG+9MrH5aekYTrnbYvsf0CMJ2R60zpGSl4hmvwEhBctwMwPS49ITvTrymP63QAPtC3kp6V3pGTy79OeV6n7wGWLh74cWJy9ZRZ87GkfaX3tOyRN/7V0sWD36c8tNMBSNLS3OiCpIXSO7qq0y8B2DoCCI4AgiOA4Dp/Ezhs3j6/emxQDybqxu/cnDt0o/SejfATIKH+1MoHTdXcNrcrjVXX+9P3Z0tv2ggBJGVT+uf31P3zI5/8tLPcno0RQFI++q8PjOzeU79eZMomEUDLdu4wK71hPQQQHAEERwDBEUBwBBBc6d8E7ulPrSwV3pDSUN/x/5fSAdSSjhfeEFq2l4BKvSbXtYbJmpqh/rqzBdB7/vuygr1/T9Jvu3X4YekR68kWwLVLR5/K9ZmkQa5rFrZmrk/nZ+x56SHryX7TcmLq3iG5xiUrff/RHrM19/rW4ty+1dJTAAAAAAAAAAAAAAAAAAAAAGx3fwE2/JeaKp4bZgAAAABJRU5ErkJggg=="
          />
        </defs>
      </svg>
    </span>
  );
};

export { CopyIcon };
