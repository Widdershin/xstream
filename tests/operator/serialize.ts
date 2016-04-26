import xs from '../../src/index';
import * as assert from 'assert';

interface SerializedStream<T> {
  streams: Object,
  dependencies: Array<Object>
}

describe('Stream.prototype.serialize', () => {
  it('is serializable', (done) => {
    const stream = xs.periodic(100);

    let serializedStream: SerializedStream<Number>;

    stream.drop(4).take(1).addListener({
      next: (x: number) => {
        assert.equal(x, 4)

        serializedStream = stream.serialize();
      },
      error: (err: any) => {
      },
      complete: () => {
      },
    })

    JSON.stringify(serializedStream);

    const deserializedStream = xs.deserialize(serializedStream);

    deserializedStream.addListener({
      next: (x: number) => {
        assert.equal(x, 5)

        done();
      },
      error: (err: any) => {
      },
      complete: () => {
      },
    })
  });
});
